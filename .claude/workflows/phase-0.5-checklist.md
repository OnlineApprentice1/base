# Phase 0.5 — Domain & Hosting Checklist

## Purpose
A manual checklist for the user to handle domain registration, DNS, email, and hosting setup. Claude does not execute these steps — just tracks them.

## Checklist

### Domain
- [ ] Domain registered (Namecheap or other registrar)
- [ ] DNS pointing to hosting (A record / CNAME)
- [ ] SSL certificate active (Let's Encrypt or Namecheap SSL)

### Hosting
- [ ] Namecheap Nebula hosting account set up
- [ ] Deployment method confirmed (manual upload / git pull / other)
- [ ] Node.js version confirmed if running server-side

### Email
- [ ] Private email set up through Namecheap (or other provider)
- [ ] Resend API key generated for the domain
- [ ] DNS records for Resend configured (SPF, DKIM, DMARC)
- [ ] Test email sent successfully via Resend
- [ ] `.env` file in project has `RESEND_API_KEY` set

### Post-Setup
- [ ] Site accessible at the domain
- [ ] SSL working (https:// loads without warnings)
- [ ] Contact form sends email successfully
- [ ] All email DNS records verified in Resend dashboard

## Notes
- This phase is entirely manual. The user handles it outside the pipeline.
- Phase 1 (Scaffold) can proceed in parallel — the Resend API key is only needed for the contact form to work in production.
- Store the Resend API key in the project's `.env` file (which should be in `.gitignore`).
