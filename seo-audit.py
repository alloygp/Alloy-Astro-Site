"""Fast SEO audit — fetches concurrently, 8s timeout per page."""
import sys, json, time, requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from concurrent.futures import ThreadPoolExecutor, as_completed

BASE = "https://alloy-astro-site.vercel.app"
HDR  = {"User-Agent": "SEO-Audit/1.0"}
issues = []

def log(sev, page, field, msg, fix=""):
    issues.append(dict(sev=sev, page=page, field=field, msg=msg, fix=fix))

def get(url):
    try: return requests.get(url, headers=HDR, timeout=8)
    except: return None

def get_sitemap_pages():
    r = get(f"{BASE}/sitemap.xml")
    if not r or r.status_code != 200:
        log("ERROR","/sitemap.xml","fetch",f"sitemap.xml returned {r.status_code if r else 'no response'}",
            "Create public/sitemap.xml or add @astrojs/sitemap integration.")
        return []
    s = BeautifulSoup(r.text, "xml")
    locs = [l.text.strip() for l in s.find_all("loc")]

    # www check
    www = [l for l in locs if "//www." in l]
    if www:
        log("WARN","/sitemap.xml","www",
            f"{len(www)}/{len(locs)} sitemap URLs use www — canonicals use non-www",
            "Standardise all <loc> entries to non-www to match astro.config.mjs site: value.")
    return locs

def check_robots():
    r = get(f"{BASE}/robots.txt")
    if not r or r.status_code != 200:
        log("ERROR","/robots.txt","fetch","robots.txt not found",
            "Create public/robots.txt with Allow: / and Sitemap: https://yourdomain.com/sitemap.xml")
        return
    text = r.text
    if "Sitemap:" not in text:
        log("WARN","/robots.txt","sitemap","No Sitemap: directive in robots.txt",
            f"Add: Sitemap: https://alloygp.co/sitemap.xml")
    elif "www." in text and "www." not in BASE:
        log("WARN","/robots.txt","www","Sitemap: URL in robots.txt uses www but canonicals don't",
            f"Change to: Sitemap: https://alloygp.co/sitemap.xml")

def check_page(sitemap_url):
    slug = urlparse(sitemap_url).path or "/"
    url  = BASE + slug
    r    = get(url)
    if not r or r.status_code != 200:
        log("ERROR", slug, "fetch", f"Page returned HTTP {r.status_code if r else 0}",
            f"Fix the route so {slug} returns 200, or remove it from sitemap.xml.")
        return

    s = BeautifulSoup(r.text, "lxml")

    # Title
    tt = s.find("title")
    t  = tt.text.strip() if tt else ""
    if not t:
        log("ERROR", slug, "title", "No <title> tag",
            f"Add title=\"...\" to BaseLayout in {slug[1:] or 'index'}.astro.")
    elif len(t) < 30:
        log("WARN", slug, "title", f"Title too short ({len(t)} chars): '{t}'",
            f"Expand to 50–60 chars with the page's primary keyword.")
    elif len(t) > 65:
        log("WARN", slug, "title", f"Title too long ({len(t)} chars): '{t}'",
            f"Trim to under 60 chars — Google rewrites longer titles.")

    # Description
    dm = s.find("meta", attrs={"name":"description"})
    d  = dm["content"].strip() if dm and dm.get("content") else ""
    if not d:
        log("ERROR", slug, "description", "No meta description",
            f"Add description=\"...\" to BaseLayout in {slug[1:] or 'index'}.astro.")
    elif len(d) > 160:
        log("WARN", slug, "description", f"Description too long ({len(d)} chars, truncated at ~155): '{d[:70]}...'",
            f"Trim to 140–155 chars.")
    elif len(d) < 70:
        log("WARN", slug, "description", f"Description very short ({len(d)} chars): '{d}'",
            "Expand to 140–155 chars with the primary keyword and a value prop.")

    # Canonical
    cl = s.find("link", rel="canonical")
    ch = cl["href"].strip() if cl and cl.get("href") else ""
    if not ch:
        log("ERROR", slug, "canonical", "No canonical link tag",
            "Ensure astro.config.mjs has site: set and BaseLayout builds the canonical URL.")
    elif "www." in ch:
        log("WARN", slug, "canonical", f"Canonical uses www: {ch}",
            "Remove www from canonical — should match the non-www site: config.")

    # OG required
    og_fields = [
        ("og:title","property"),("og:description","property"),
        ("og:url","property"),("og:type","property"),
        ("og:site_name","property"),("og:locale","property"),
        ("og:image","property"),("og:image:width","property"),
        ("og:image:height","property"),("og:image:alt","property"),
    ]
    for name, attr in og_fields:
        tag = s.find("meta", {attr: name})
        val = tag["content"].strip() if tag and tag.get("content") else ""
        if not val:
            fix_map = {
                "og:image":       "Add og:image pointing to absolute URL of 1200×630 PNG",
                "og:image:width": "Add <meta property=\"og:image:width\" content=\"1200\" />",
                "og:image:height":"Add <meta property=\"og:image:height\" content=\"630\" />",
                "og:image:alt":   "Add <meta property=\"og:image:alt\" content=\"Descriptive alt text\" />",
                "og:locale":      "Add <meta property=\"og:locale\" content=\"en_US\" />",
            }
            log("ERROR" if name in ("og:title","og:description","og:url","og:image") else "WARN",
                slug, name, f"Missing {name}",
                fix_map.get(name, f"Add <meta property=\"{name}\" content=\"...\" /> to BaseLayout <head>."))
        elif name == "og:image" and not val.startswith("http"):
            log("ERROR", slug, name, f"og:image is not an absolute URL: {val}",
                "Build absolute URL: new URL('/assets/og-image.png', Astro.site).toString()")

    # Twitter
    tw_fields = ["twitter:card","twitter:title","twitter:description","twitter:image","twitter:image:alt"]
    for name in tw_fields:
        tag = s.find("meta", attrs={"name": name})
        val = tag["content"].strip() if tag and tag.get("content") else ""
        if not val:
            log("ERROR" if "image" in name or name == "twitter:card" else "WARN",
                slug, name, f"Missing {name}",
                f"Add <meta name=\"{name}\" content=\"...\" /> to BaseLayout <head>.")

    tw_site = s.find("meta", attrs={"name":"twitter:site"})
    if not (tw_site and tw_site.get("content")):
        log("WARN", slug, "twitter:site", "Missing twitter:site (@handle)",
            'Add <meta name="twitter:site" content="@alloygp" /> to BaseLayout.')

    # Schema
    ld_tags = s.find_all("script", type="application/ld+json")
    if not ld_tags:
        log("ERROR", slug, "schema", "No JSON-LD schema found",
            "Add Organization schema to BaseLayout and page-specific schema per page.")
    else:
        types = []
        for sc in ld_tags:
            try: types.append(json.loads(sc.string or "{}").get("@type","?"))
            except: log("ERROR", slug, "schema", "JSON-LD block has invalid JSON",
                        "Validate at https://validator.schema.org")
        if not any(t in ("Organization","ProfessionalService","LocalBusiness") for t in types):
            log("WARN", slug, "schema", f"No Organization/LocalBusiness schema (found: {types})",
                "Add Organization schema to BaseLayout so it appears on every page.")
        if slug == "/faq" and "FAQPage" not in types:
            log("WARN", slug, "schema", "FAQ page missing FAQPage schema",
                "Add FAQPage schema with Question/Answer pairs via pageSchema prop in faq.astro.")
        if "/resource-hub/" in slug and "Article" not in types:
            log("WARN", slug, "schema", "Article page missing Article schema",
                "Add Article schema via pageSchema prop in the resource hub .astro route.")

    # og:type = article for articles
    if "/resource-hub/" in slug:
        ot = s.find("meta", property="og:type")
        ov = ot["content"] if ot and ot.get("content") else ""
        if ov != "article":
            log("WARN", slug, "og:type",
                f"Resource hub page has og:type='{ov}' — should be 'article'",
                "Add ogType=\"article\" prop to BaseLayout call in the .astro route file.")

# ── run ───────────────────────────────────────────────────────────────────────
check_robots()
pages = get_sitemap_pages()
print(f"Auditing {len(pages)} pages from sitemap...")

with ThreadPoolExecutor(max_workers=6) as ex:
    futs = {ex.submit(check_page, p): p for p in pages}
    done = 0
    for f in as_completed(futs):
        done += 1
        print(f"  [{done}/{len(pages)}] {urlparse(futs[f]).path}", flush=True)

# ── report ────────────────────────────────────────────────────────────────────
errs  = [i for i in issues if i["sev"] == "ERROR"]
warns = [i for i in issues if i["sev"] == "WARN"]

print(f"\n{'='*64}")
print(f"AUDIT COMPLETE — {len(errs)} errors · {len(warns)} warnings · {len(pages)} pages")
print(f"{'='*64}")

for grp, label in [(errs,"❌ ERRORS"),(warns,"⚠️  WARNINGS")]:
    if not grp: continue
    print(f"\n{label} ({len(grp)})\n{'─'*60}")
    for i in grp:
        print(f"  Page:  {i['page']}")
        print(f"  Check: {i['field']}")
        print(f"  Issue: {i['msg']}")
        if i['fix']: print(f"  Fix:   {i['fix']}")
        print()

if not issues:
    print("\n✅ All checks passed!")
