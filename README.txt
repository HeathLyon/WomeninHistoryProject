THE DISTAFF DISPATCH
Revolutionary-era blog and editable text

WHAT IS INCLUDED

index.html          The complete webpage, readable even if scripts cannot run.
styles.css          Your original rose/red/navy theme and animation styles,
                    with small additions for articles, notes, and long text.
script.js           Your original scrolling, cursor trail, and Ken Burns effects,
                    plus the text reader and configured Google Docs connection.
content.txt         A backup/template containing all 150 editable text fields.
site-config.js      Already connected to your published Google Doc.
google-doc-feed.gs  Optional alternate connection; not needed for this Doc.
README.txt          These instructions.

The fictional reporter is Eleanor Hartwell. She writes as though living in 1776.
The historical subjects are Abigail Adams, Mercy Otis Warren, and Phillis Wheatley.
Ruth Whitcomb is a fictional print-shop worker. Her story is clearly labeled.
Sources and later artwork dates appear in the final section of the website.

YOUR GOOGLE DOC IS CONNECTED

The website now reads this published Google Doc directly:
https://docs.google.com/document/d/e/2PACX-1vSkV_52Rs1qEsfKcILnyPyM5oFEhFvs15VZAfeozztx8Ugp2ZCsK7UdvEvIo8IOjcFyT6HcCthivHdg/pub

No Apps Script setup is needed for this document.

1. Open the ORIGINAL Google Doc in its normal editing view. The published /pub
   link above is a read-only view; it is not the link your friend edits.
2. Give your friend Editor access to the original Google Doc.
3. Change the words BELOW each [[label]]. Keep the labels exactly as written.
4. Let Google Docs finish saving. In File > Share > Publish to web > Published
   content & settings, keep "Automatically republish when changes are made"
   turned on.
5. Reload the website after Google republishes. It also checks once each minute
   while the page is visible. Google can take several minutes to update the
   published version, so the entire process is not instantaneous.

The website extracts only the document text; Google Docs formatting and markup
are not inserted into the page. Its colors, layout, and animations stay intact.
The document includes all 150 editable fields and currently matches the bundled
issue. The original Doc has not been edited on your behalf.

USING THE DOWNLOAD ON YOUR OWN HOST

Keep index.html, styles.css, script.js, site-config.js, and content.txt together.
Upload that folder to an ordinary static host. The supplied site-config.js
already contains your published Doc link, so later Doc edits need no re-upload.

Your host must allow requests to https://docs.google.com. Direct cross-origin
reading was verified for the provided Site origin. If another host's content
security policy blocks it, allow that source in connect-src or use the optional
Apps Script method below. Local double-click/file previews are best treated as
built-in snapshots; use a hosted page for reliable external content loading.

The portrait and slideshow images are hosted on Wikimedia Commons and require
an internet connection. If one fails, a styled background or nameplate remains.
Use UTF-8 when saving files.

USING ONLY CONTENT.TXT

Set publishedDocUrl AND appsScriptUrl to empty strings in site-config.js. Upload
that file. Then edit content.txt in a plain-text editor, upload it, and reload
the hosted page. A neighboring .txt file usually cannot be fetched when opening
index.html by double-clicking from your computer.

OPTIONAL: CONNECT A DIFFERENT GOOGLE DOC

1. Copy all of content.txt into one Google Doc, keeping each label on its own
   line. Keep all website fields in one published document tab.
2. Choose File > Share > Publish to web, publish the Doc, and keep automatic
   republishing enabled. Copy the URL ending in /pub.
3. Replace publishedDocUrl in site-config.js with that /pub URL and upload the
   changed config. A normal /edit sharing link will not work as the content URL.

OPTIONAL: APPS SCRIPT ALTERNATIVE

This method is included for hosts that cannot load the published document
URL directly. It is not required for the already connected Site.

1. In the original Google Doc, open Extensions > Apps Script. Paste the complete
   contents of google-doc-feed.gs into the script editor.
2. Set DOCUMENT_ID to the ID in the NORMAL editing URL between /d/ and /edit.
   A published ID beginning 2PACX is different and cannot be used for openById.
3. Save, choose testConnection, Run, and authorize the account that reads the Doc.
4. Deploy > New deployment > Web app. Execute as Me; Who has access: Anyone.
   Copy the deployed web app URL ending in /exec.
5. In site-config.js, leave publishedDocUrl blank and put the /exec URL into
   appsScriptUrl. Upload the config. The first Doc tab becomes a public read-only
   text feed. Later text edits need no script deployment; code changes do.

Some school/work accounts restrict anonymous publishing or Apps Script web
apps. Those account restrictions need to be resolved by their administrator.

HOW TO EDIT THE TEXT

Each field starts with a label on a line by itself, for example:

[[abigail.title]]
Remember

[[abigail.title_accent]]
the ladies.

[[abigail.body_one]]
Put your revised first paragraph here.

Change the text BELOW the labels. Keep the labels exactly as written. A headline
has a regular part and an italic accent part; both are editable. Long paragraphs
and line breaks are allowed. Source URLs can be replaced in their own fields.
HTML tags are displayed as plain text; use ordinary writing instead of markup.
Google Docs font, color, and heading formatting do not change the website design.

COMMON LABELS

site.title                  Browser tab title.
site.brand                  Header title and masthead name.
hero.title / title_accent   Main title, split into regular and italic parts.
hero.description            Opening introduction.
site.byline                 Byline repeated under all article datelines.
hero.byline                 The separate opening byline.
abigail.*                   Abigail article, headline, dates, links, and caption.
mercy.*                     Mercy article, headline, dates, links, and caption.
phillis.*                   Phillis article, headline, dates, links, and caption.
fiction.*                   Ruth's fictional article and typographic illustration.
about.*                     Reporter biography and fiction disclosure.
sources.*                   Research links, artwork credits, editorial notes.
slides.*                    Slideshow captions and artwork credit URLs.
ui.*                        Slideshow and motion button labels.
*.nav_label                 Navigation accessibility label; hero issue links too.
site.updated                The editable website-text revision date.
site.instagram_url          Optional Instagram URL. Blank keeps the link hidden.

The full text file includes every label; this list is only a guide. Section and
slide numbers are calculated automatically. Article structure and the number of
stories are set in HTML; this text connection changes words, not page structure.

If you rename a woman in a story, also update her category, nav_label, image_alt,
caption, source labels, source URLs, and relevant artwork. These are separate
fields so the editor retains control. If you change the website title, update
site.brand and sources.seal_caption too when you want those to match.

FALLBACKS AND TROUBLESHOOTING

- Source order: published Google Doc, optional Apps Script if no published URL
  is configured, then uploaded content.txt when neither connection is configured.
- If a configured source fails, the last readable issue stays on screen. A
  successful Doc response is cached in that browser for future fallback; a
  first-time visitor sees the bundled text while the Doc loads.
- Missing labels fall back to supplied text. Repeated labels or missing required
  title/introduction values reject the update, keeping a readable page.
- If changes do not appear, open the /pub link first. If it still shows old text,
  wait for Google to republish and check that automatic republishing is enabled.
- If /pub shows the changes but the site does not, reload the site and confirm
  that each [[label]] remains on its own line. Keep Google Docs content in the
  tab represented by the published URL. The browser console reports any errors.
- To stop reading Google Docs, clear both source URLs in site-config.js and
  upload it. To stop exposing the Doc publicly, stop publishing it in Google.

TECHNICAL NOTES AND REFERENCES

Published Google Docs are fetched with CORS and credentials omitted. The
inert HTML parser reads the published content container and extracts plain
text with paragraph boundaries, ignoring scripts and styles. Edited text is
inserted with textContent, never arbitrary HTML; unsafe link schemes are disabled.
The fixed configured URL is validated as a published docs.google.com document.

Google publishing and automatic update documentation:
https://support.google.com/docs/answer/183965?hl=en

Optional Apps Script documentation:
https://developers.google.com/apps-script/guides/content
https://developers.google.com/apps-script/guides/web
https://developers.google.com/apps-script/reference/document/document

The historical research links are included on the website and in content.txt.
