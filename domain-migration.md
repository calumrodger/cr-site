# calumrodger.com: SiteGround → Porkbun

Move the domain's registration and DNS from SiteGround to Porkbun (same as makepoem.press), then cancel SiteGround. Do it before the February 2027 SiteGround renewal.

## Current setup (checked 28 Oct 2026)

| What | Where | Details |
|---|---|---|
| Registrar | SiteGround (wholesale registrar Tucows) | Expires 27 Mar 2027. Contact email is my Gmail (confirmed) |
| DNS | SiteGround | `ns1.siteground.net`, `ns2.siteground.net` |
| Website | statichost | Apex `A 95.217.26.94` and `AAAA 2a01:4f9:c01f:8002::` serve the site. These are statichost's published apex addresses (TTL 1 day). `www` CNAME `calumrodger.statichost.page` redirects to the apex |
| Email | SiteGround, unused | MX, SPF and DKIM point at SiteGround. Nothing to migrate. |
| DNSSEC | Off | No DS record, so nothing to turn off first |

## When

- A transfer adds a year to the current expiry date, so doing it early loses no paid time.
- SiteGround seems to renew about a month before expiry: the registry shows the domain last changed on 25 Feb 2026. So the February renewal is probably this, and the transfer should be finished before SiteGround charges, ideally by early February 2027.
- Aim for December 2026 or January 2027. Avoid the last few days before expiry.
- Check whether a hosting plan also renews in February: my.siteground.com → **Services → Hosting** shows each plan's expiry date. SiteGround auto-renews plans of 12+ months 15 days before they expire.
- Keep the hosting plan running until step 4 is done. SiteGround's DNS for the domain lives in that plan, so ending it early would take the site offline.

## Steps

Menu names below come from SiteGround's and Porkbun's help pages (links at the end), checked 28 Oct 2026. They may have moved a little by the time I do this.

### 1. Before starting

- [ ] Confirm the expiry date is still 27 Mar 2027: my.siteground.com → **Services → Domains**.
- [ ] Optional: save a copy of the current DNS for reference. Either screenshot it in SiteGround (**Websites** → **Site Tools** next to calumrodger.com → **Domain → DNS Zone Editor**), or ask SiteGround's nameserver directly:

  ```powershell
  'A','AAAA','MX','TXT' | % { Resolve-DnsName calumrodger.com -Type $_ -Server ns1.siteground.net }
  Resolve-DnsName www.calumrodger.com -Type CNAME -Server ns1.siteground.net
  ```

- Don't change the domain's contact details (registrant name, organisation or email) at SiteGround before or during the transfer. Tucows treats that as a change of owner and blocks transfers for 60 days.

### 2. Transfer the registration

**At SiteGround:** log in at my.siteground.com → **Services → Domains** → **Settings** next to calumrodger.com. That opens *Manage My Domain*. The actions below are in its ⋮ (kebab) menu.

- [ ] ⋮ → **Registrar Lock** → switch it off. The domain's status should change from *Registrar-Lock* to *Active*.
- [ ] ⋮ → **Get EPP Code**. Guides disagree on whether SiteGround shows the code in a pop-up or emails it to the registrant address (my Gmail), so check both.
  - It's a random, case-sensitive string of roughly 8–16 letters, numbers and symbols, something like `Xk7#mQ2p!Lr9` (made-up example).
  - Copy and paste it; don't retype it. Watch for a trailing space if copying from an email.
  - Treat it like a password. Anyone who has it can move the unlocked domain.
  - Get it on the day I start the Porkbun transfer. Codes can be single-use, and ICANN's revised transfer rules (adopted 2026, not yet in force) will make them expire after 14 days.
- [ ] ⋮ → **Renewal Settings** → switch **Autorenewal** off → **Confirm**. This stops SiteGround charging for a renewal while the transfer is in progress. The domain doesn't expire until March, so there's no risk of losing it.

**At Porkbun** (logged in to the account that has makepoem.press):

- [ ] Go to porkbun.com/transfer (or click **TRANSFER** at the top of any page).
- [ ] Enter `calumrodger.com` (no www) in **Domain Name**, paste the code into **Auth Code**, click **Submit**.
- [ ] Leave the first two option boxes ticked (private contact details, auto-renew). Leave the third box (set up DNS and nameservers at Porkbun before the transfer) unticked, because DNS is step 3.
- [ ] **Add Transfers to Cart** → **Continue to Billing** → pay. The price includes a year's renewal.

**Emails** (check spam too):

- [ ] Tucows emails my Gmail a link to approve or decline the transfer. It may be branded as SiteGround or OpenSRS. If I approve it, the transfer finishes within hours. If I ignore it, the transfer completes on its own after 5 days. Don't click decline.
- [ ] Porkbun may send its own confirmation email. If it does, click the link in it.

**Track progress** at Porkbun → **Transfer** in the top menu. The nameservers stay on SiteGround throughout, so the site keeps working.

| Status | What to do |
|---|---|
| pending transfer from losing registrar | Normal. Approve the Tucows email, or wait up to 5 days. |
| pending owner confirmation | Click the link in Porkbun's email. |
| bad authcode, pending submit | The code was rejected. Get a new one from SiteGround, then Porkbun **Options → Update authcode**. |
| domain status does not allow transfer | Still locked at SiteGround. Turn Registrar Lock off, then **Update authcode** to resubmit. |
| transfer complete | Done. calumrodger.com now appears in Porkbun's **Domain Management**. |

### 3. Set up DNS at Porkbun

Porkbun → **Domain Management** → click **DNS** under calumrodger.com (or **Details** → the edit icon by **DNS RECORDS**). This opens *Manage DNS Records*:

- To add a record: pick **Type**, fill in **Host** and **Answer**, leave **TTL** at its default, and click **Add**.
- Existing records are listed below the form, each with a trash icon to delete it.

- [ ] Delete any record whose answer is `pixie.porkbun.com`. That's Porkbun's parking page, usually an `ALIAS` on the blank host and a `CNAME` on `*`. If one is left in, adding the `A` record fails with "A CNAME or ALIAS record with that host already exists".
- [ ] Add `A`: host blank (apex), answer `95.217.26.94`
- [ ] Add `AAAA`: host blank, answer `2a01:4f9:c01f:8002::`
- [ ] Add `CNAME`: host `www`, answer `calumrodger.statichost.page`
- These match what SiteGround serves now. statichost's docs prefer a single `ALIAS` record on the apex pointing at `calumrodger.statichost.page`, which Porkbun supports. Copying the existing records like-for-like is simpler to check, though.
- [ ] Optional, so spammers can't convincingly fake the domain (no email is used on it):
  - `MX`: host blank, priority `0`, answer `.` (a "null MX")
  - `TXT`: host blank, `v=spf1 -all`
  - `TXT`: host `_dmarc`, `v=DMARC1; p=reject`
- Don't copy SiteGround's MX, SPF or DKIM records.
- [ ] Check Porkbun's copy before switching to it. This asks Porkbun's nameserver directly, so it works while SiteGround is still live. If Porkbun's server doesn't answer yet, skip this; the checks in step 4 cover it.

  ```powershell
  Resolve-DnsName calumrodger.com -Type A -Server curitiba.ns.porkbun.com          # 95.217.26.94
  Resolve-DnsName calumrodger.com -Type AAAA -Server curitiba.ns.porkbun.com       # 2a01:4f9:c01f:8002::
  Resolve-DnsName www.calumrodger.com -Type CNAME -Server curitiba.ns.porkbun.com  # calumrodger.statichost.page
  ```

### 4. Switch nameservers

- [ ] Porkbun → **Domain Management** → **Details** next to calumrodger.com → the edit icon under **Authoritative Nameservers** → **Use Our Default Nameservers** → **Save Nameservers**. The list should become `curitiba`, `fortaleza`, `maceio` and `salvador` `.ns.porkbun.com`.
- Both providers serve the same records, so nothing breaks while the change spreads.
- [ ] After a few hours (allow up to 48), check in PowerShell:

  ```powershell
  Resolve-DnsName calumrodger.com -Type NS    # *.ns.porkbun.com
  Resolve-DnsName calumrodger.com -Type A     # 95.217.26.94
  Resolve-DnsName calumrodger.com -Type AAAA  # 2a01:4f9:c01f:8002::
  Resolve-DnsName www.calumrodger.com         # CNAME calumrodger.statichost.page
  ```

  If it still shows SiteGround, run `Clear-DnsClientCache`, or add `-Server 1.1.1.1` to bypass my own cache. whatsmydns.net (record type NS) shows how far the change has spread.

- [ ] Open https://calumrodger.com and https://www.calumrodger.com. Both should load with a valid certificate, and www should redirect to the apex. statichost needs no changes.

### 5. Clean up

- [ ] Once the site has worked for a day or two, stop the SiteGround hosting plan renewing: my.siteground.com → **Services → Hosting** → **Settings** next to the plan → ⋮ → **Renewal Settings** → **Autorenewal** off → **Confirm**.
  - The plan then just runs out at its expiry date.
  - SiteGround's help pages don't describe a button to cancel it immediately. To close it sooner, or to ask about a refund for unused time, contact SiteGround support.
- [ ] Check that **Services → Domains** at SiteGround no longer lists calumrodger.com, so nothing there can renew.
- [ ] Porkbun → **Domain Management** → **Details**: check that auto-renew and WHOIS privacy are on.
- [ ] Update the Hosting section of `CLAUDE.md`, which says DNS and email are at SiteGround.

## Help pages (checked 28 Oct 2026)

- SiteGround:
  - [get the EPP code](https://www.siteground.com/kb/epp_code)
  - [lock/unlock a domain](https://www.siteground.com/kb/how_to_lockunlock_my_domain_name)
  - [domain auto-renewal](https://www.siteground.com/kb/domain-auto-renewal)
  - [stop a plan's automatic billing](https://www.siteground.com/kb/how_to_stop_the_automatic_billing_for_my_plan)
- Porkbun:
  - [transfer a domain in](https://kb.porkbun.com/article/56-how-to-transfer-a-domain-to-porkbun)
  - [transfer statuses](https://kb.porkbun.com/article/79-what-do-transfer-statuses-mean)
  - [add DNS records](https://kb.porkbun.com/article/231-how-to-add-dns-records-on-porkbun)
  - [parking-record error](https://kb.porkbun.com/article/239-cname-alias-record-with-that-host-already-exists-error)
  - [switch to Porkbun's nameservers](https://kb.porkbun.com/article/63-how-to-switch-to-porkbuns-nameservers)
- statichost: [custom domains](https://www.statichost.eu/docs/domains/)
