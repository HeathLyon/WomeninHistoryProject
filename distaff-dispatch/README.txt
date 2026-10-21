THE DISTAFF DISPATCH
Revolutionary-era blog and editable text

WHAT IS INCLUDED

index.html          The complete webpage, readable even if scripts cannot run.
styles.css          Your original rose/red/navy theme and animation styles,
                    with small additions for articles, notes, and long text.
script.js           Your original scrolling, cursor trail, and Ken Burns effects,
                    plus the text reader and optional Google Docs connection.
content.txt         All 150 editable text fields. Start editing here.
site-config.js      The one-time Google Docs connection setting.
google-doc-feed.gs  The small Google Apps Script that reads the Google Doc.
README.txt          These instructions.

The fictional reporter is Eleanor Hartwell. She writes as though living in 1776.
The historical subjects are Abigail Adams, Mercy Otis Warren, and Phillis Wheatley.
Ruth Whitcomb is a fictional print-shop worker. Her story is clearly labeled.
Sources and later artwork dates appear in the final section of the website.

QUICK START: TEXT FILE ONLY

1. Keep index.html, styles.css, script.js, site-config.js, and content.txt together.
2. Upload that folder to any ordinary static website host.
3. Edit content.txt in a plain-text editor. Upload the changed content.txt and
   reload the website. You do not need to edit the HTML, CSS, or animation code.

Opening index.html directly by double-clicking shows the built-in issue and
animations. Browsers normally block reading a neighboring .txt file in this
mode. Use a web host to see changes from content.txt.

Use UTF-8 when saving. The portrait and slideshow images are hosted externally
on Wikimedia Commons and need an internet connection. If an image cannot load,
the page retains a styled background or nameplate. You may download the credited
images yourself, put them in an images folder, and update the corresponding
image paths in index.html and IMAGE_PLAYLIST near the end of script.js.

ONE-TIME GOOGLE DOCS SETUP

This connection lets your friend edit the Google Doc, save normally, and see
changes on the hosted website. She will not need to edit code for later changes.

1. Make a new Google Doc. Copy the ENTIRE contents of content.txt into its FIRST
   document tab. Keep every [[label]], including labels for links and buttons.
   Use ordinary paragraphs, not tables. Do not split the text among Doc tabs.

2. Share the Doc with your friend as an EDITOR. The feed you deploy below will
   make this first tab's full text publicly readable. Do not include private
   notes in that tab. You do not have to enable public editing of the Doc.

3. From that Google Doc, open Extensions > Apps Script. Replace the sample
   code with the complete contents of google-doc-feed.gs.

4. Set DOCUMENT_ID at the top of that script. Find the ID in the Doc's URL:

   https://docs.google.com/document/d/THE_DOCUMENT_ID_IS_HERE/edit

   Paste only that ID between the single quotes. Do not paste the entire URL.
   Save the script. In the function selector, choose testConnection and click
   Run. Authorize the script under the Google account that can read the Doc.
   A successful test prints the number of characters read.

5. Choose Deploy > New deployment. Select Web app.
   Execute as: Me (the account that can read the Doc).
   Who has access: Anyone.
   Deploy and copy the WEB APP URL ending in /exec.
   Some school/work accounts restrict anonymous Apps Script web apps; use an
   account that permits the setting or ask that account's administrator.

6. Open site-config.js in a text editor. Paste that deployed WEB APP URL into
   appsScriptUrl. The result will have this shape:

   window.DISPATCH_CONFIG = {
       appsScriptUrl: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec',
       refreshSeconds: 300
   };

   Use the URL returned by Google. A docs.google.com editing link, a published
   document link, or a test deployment URL ending in /dev will not work here.

7. Upload the changed site-config.js beside the other website files and reload.
   The site requests the Doc when it opens and every five minutes while visible.
   Reloading asks for a fresh copy immediately. Google saving/propagation and
   network delays can add time. Later edits to the Doc need no website re-upload
   and no script re-deployment. Changes to the Apps Script CODE itself do require
   an updated deployment version.

8. Test with one headline: change the words under [[hero.title]] in the Doc,
   wait for Google Docs to finish saving, then reload the website.

The provided website has an EMPTY appsScriptUrl until you complete these steps.
No Google Doc has been created, connected, or deployed on your behalf.

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

- If no Google feed is configured, the site reads the uploaded content.txt.
- With a feed configured, Google Docs takes precedence over content.txt.
- If Google is unavailable, visitors keep the last successfully loaded issue
  cached in that browser; a first-time visitor sees the bundled text.
- Missing labels fall back to the supplied text. Duplicated labels or missing
  required title/introduction fields reject that update, keeping a readable page.
- To turn off Google Docs updates, set appsScriptUrl back to an empty string,
  upload site-config.js, and reload. To stop the public feed itself, disable its
  deployment in Apps Script's Manage deployments.
- If the text does not update, check Google's save status, the first Doc tab,
  DOCUMENT_ID, the /exec URL, and deployment access set to Anyone. The browser
  console reports connection and label errors. Never paste secrets into the Doc.

TECHNICAL NOTES AND REFERENCES

The public feed is read-only, limited to one fixed Doc ID, and uses Google's
documented JSONP content-service pattern to work on ordinary static hosts.
It exposes the first Doc tab's text, including its labels and instructions.
It has no write endpoint and never returns credentials or account information.
The website inserts edited words as text, never arbitrary HTML, and disables
unsafe link protocols. Google Apps Script account quotas still apply; this is
suited to a small presentation/blog rather than a high-traffic publication.

Google documentation:
https://developers.google.com/apps-script/guides/content
https://developers.google.com/apps-script/guides/web
https://developers.google.com/apps-script/reference/document/document

The historical research links are included on the website and in content.txt.
