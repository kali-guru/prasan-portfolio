# Prasan Gurung — Cybersecurity Portfolio

Static personal portfolio with projects, education, contact links, and five certificate PDFs. Plain HTML, CSS, and JavaScript; no build or dependencies required.

## Preview

Open `index.html`, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000.

## GitHub Pages

In Settings → Pages, choose Deploy from a branch, `main`, and `/(root)`.
The included CNAME is `prashantgrg.com.np`. Configure the domain and DNS before using it; remove CNAME to test the default github.io address first. Enable HTTPS when available.

## Cloudflare Pages

Connect this repository, select `main`, set framework preset to None, build command to `exit 0`, and output directory to `.`. Add your domain through Custom domains and follow the DNS instructions. Preserve existing Zoho mail DNS records.

## Files

- `index.html`: portfolio content and links
- `assets/style.css`: responsive styling
- `assets/script.js`: email copying and copyright year
- `assets/certificates/`: certificate PDFs and preview
- `CNAME`, `robots.txt`, `sitemap.xml`: domain and discovery

If the domain changes, update CNAME, canonical and Open Graph URLs in index.html, robots.txt, and sitemap.xml. If the email changes, update index.html and assets/script.js.

Display name follows the supplied certificates: Prasan Gurung. Phone assumes Nepal's +977 country code. No graduation year, professional experience, or live TryHackMe rank is claimed.

Local asset references, section links, JavaScript syntax, and certificate inclusion were checked. Live browser rendering has not been verified. Publishing requires enabling hosting; uploading source alone does not deploy the site.
