# SecureDNS

SecureDNS is a small DNS-over-HTTPS utility and installation page.

The goal is simple: **encrypt DNS lookups without routing normal internet traffic through a remote VPN server.**

## Install

The public site is designed for people who do not want to navigate GitHub:

- **Android:** download the latest APK from GitHub Releases.
- **iPhone / iPad:** download the signed `SecureDNS.mobileconfig` profile directly from the site.

## What it changes

SecureDNS changes how DNS lookups are resolved. It does not hide your public IP address, proxy all traffic, decrypt HTTPS traffic, or guarantee access when a network blocks a destination by IP or another non-DNS method.

On Android, the app uses Android's `VpnService` API locally so it can receive DNS packets. Normal app traffic is intended to stay on the existing network connection.

On iOS, the configuration profile sets Cloudflare DNS over HTTPS directly.

## Checksums

Current Android APK SHA-256:

```
1a7736f87aee43b50699fc4824b8decf17ba52a00c0db6b62122049c5220bd9f
```

Current signed iOS profile SHA-256:

```
f15f5c50f8c0a527b275b3c37ae6e75b247f93bb5dae0f1f0a09d571b8c71d34
```

## Publishing an Android release

Create a GitHub Release and attach the APK. The website automatically queries the latest release and points the Android download button to the first `.apk` asset it finds.

Suggested asset name:

```
SecureDNS-v1.0.1.apk
```

## GitHub Pages

The repository includes a Pages workflow. Pushes to `main` deploy the root of the repository as a static site.

If Pages has not been enabled for this repository yet, open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions** once.

## Profile signature

The iOS profile is cryptographically signed by a self-signed Ardalivus / ZyForge certificate. iOS can therefore display the signer but may label it **Unverified** because the certificate does not chain to a public certificate authority. Users are not asked to install or trust a root certificate.
