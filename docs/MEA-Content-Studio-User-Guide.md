# MEA Content Studio: simple user guide

This guide explains how to update the MEA Business and Technology Hub without editing code.

## Three things to remember

1. Your work saves as a **draft in the browser you are using**.
2. Students cannot see a draft.
3. Students see a change only after you choose **Publish changes**.

> **Important:** Use the same browser and the same Windows account each time. A draft made in Chrome on one computer will not automatically appear in Edge or on another computer.

## 1. Getting access and setting up a computer

### What each editor needs

Each person who edits the website needs:

1. Their own GitHub account.
2. Permission to write to the website repository.
3. A Studio login created on the computer and browser they will use.
4. A GitHub publishing token saved on that computer.

The website repository is `Corentis-88/mea-business-technology-hub`.

### Give a colleague access to the repository

The repository owner does this once:

1. Sign in to GitHub.
2. Open the `mea-business-technology-hub` repository.
3. Click **Settings**.
4. Click **Collaborators**.
5. Click **Add people**.
6. Search for the colleague's GitHub username or email address.
7. Select the correct person.
8. Send the invitation.
9. Ask the colleague to open the GitHub invitation and accept it.

> **Warning:** A collaborator on a repository owned by a personal GitHub account receives write access. They can change repository files. Remove their access in GitHub if they no longer need it.

### Understand the Studio login

The Studio username and password are **not a shared online account**.

- They are created separately in each browser.
- They stay on that computer.
- They do not give a person GitHub permission.
- They do not copy drafts between computers.
- The password itself is not uploaded to the website or GitHub.

This means a colleague should create their **own** Studio username and password on their work computer. They do not need your Studio password.

### Create the Studio login on a new computer

1. Open Chrome or Edge on the computer that will be used for editing.
2. Open the Studio link:
   `https://corentis-88.github.io/mea-business-technology-hub/?studio=mea-7f3k9q`
3. The page will say **Create the login for this computer**.
4. Enter a memorable username. It must have at least 3 characters.
5. Enter a password with at least 12 characters.
6. Enter the same password again.
7. Click **Create login and open studio**.

> **Warning:** Clearing this browser's site data can remove its Studio login, saved publishing connection and local draft. Download backups regularly.

### Connect GitHub for publishing

The first time an editor publishes from a computer:

1. In the Studio, click **Publish changes**.
2. Find **Connect this computer to GitHub**.
3. Follow the token instructions shown there.
4. Paste the token into **GitHub token**.
5. Click **Check and save connection**.

For the repository owner, use a fine-grained token that is limited to this repository and has **Contents: Read and write**.

> **Important for collaborators:** GitHub currently lists using a fine-grained personal access token for a repository where the user is only a repository collaborator as a limitation. Do not share the owner's token. The safest long-term arrangement for several editors is to move the repository to a GitHub organisation, add each editor as a member, and let each person create their own repository-limited token. A classic token with the `repo` scope may work for a collaborator, but it can reach every repository that person can access and is therefore much broader. Only use that fallback if the repository owner accepts this risk.

Treat a GitHub token like a password. Never email it, put it in a document or paste it into a message.

## 2. Opening the Studio

1. Open the Studio link:
   `https://corentis-88.github.io/mea-business-technology-hub/?studio=mea-7f3k9q`
2. Enter the Studio username created in this browser.
3. Enter the Studio password.
4. Click **Open editing studio**.
5. Wait for the dashboard headed **What would you like to do?**

The main choices are:

- **Edit the site** — click and edit a homepage or revision-topic preview.
- **Add something new** — add a page, revision content, material, link or case study.
- **Publish changes** — check the draft and put it live.
- **More content and tools** — open the detailed editors.

## 3. Editing information on an existing revision topic

Use this when changing a heading, explanation, paragraph or bullet point.

1. Open the Studio.
2. Click **Edit the site**.
3. At the top of the editing panel, choose **Revision Topic**.
4. Choose the qualification.
5. Choose the revision topic.
6. Click the section you want to change in the page preview.
7. Use the panel beside the preview.
8. Change **Section heading** if needed.
9. Change **Explanation paragraphs**.
10. Leave one blank line between separate paragraphs.
11. Change **Bullet points** if needed.
12. Put each bullet point on a new line.
13. Look at the preview as you type.
14. Check that the top of the Studio says the draft is saved.

For quizzes, vocabulary, exam questions or **Say it simpler**:

1. Open **More content and tools**.
2. Click **Revision content**.
3. Choose the qualification, unit and revision topic.
4. Choose the correct tab, such as **Vocabulary**, **Quiz** or **Exam practice**.
5. Edit the labelled boxes.
6. Open **Preview** to check the result.

> **Warning:** Do not paste a whole Word document into one paragraph. Use short paragraphs, useful headings and bullet points.

## 4. Editing or replacing a picture

### Replace a picture on a revision topic

1. Open **Edit the site**.
2. Choose **Revision Topic**.
3. Choose the qualification and revision topic.
4. Click the section that contains the picture.
5. In the editing panel, click **Replace this image**.
6. Choose a PNG, JPEG or WebP file from the computer.
7. Wait for the new picture to appear in the preview.
8. Edit **Describe the image for screen readers**.
9. Write one clear sentence explaining the important content of the picture.
10. Edit **Caption shown below the image**.
11. Check the preview.

### Replace a picture on an extra page

1. Open **More content and tools**.
2. Click **Extra pages**.
3. Choose the page.
4. Open the section containing the picture.
5. Click **Remove image**.
6. Click or drop a replacement image into the image box.
7. Complete **Describe the image**.
8. Complete **Caption**.

> **Warning:** Alternative text is required for accessibility. Do not use a filename such as `image1.jpg`. Describe what the image teaches.

## 5. Adding a picture

### Add a picture to an existing revision-topic section

1. Open **Edit the site**.
2. Choose **Revision Topic**.
3. Choose the qualification and revision topic.
4. Click the section that needs a picture.
5. Click **Add an image** in the editing panel.
6. Choose a PNG, JPEG or WebP file.
7. Wait while the Studio prepares the image automatically.
8. Write the screen-reader description.
9. Add a short caption.
10. Check the preview on both **Desktop** and **Phone**.

### Add a new image section to an extra page

1. Open **More content and tools**.
2. Click **Extra pages**.
3. Choose the page.
4. Scroll to **Add another section**.
5. Click **Image and text**.
6. Open the new section.
7. Enter its heading and explanation.
8. Drop an image onto the image box, or click the box to choose a file.
9. Add the image description and caption.

Use a clear, sharp image. Avoid tiny writing inside the picture because it becomes difficult to read on a phone.

## 6. Adding a new page

Use an extra page for content that does not belong inside an existing qualification topic.

1. Open the Studio.
2. Click **Add something new**.
3. Click **A new page**.
4. Choose one starting layout:
   1. **Blank page** for a simple page.
   2. **Study guide** for text, key points and a picture.
   3. **News or update** for a short message and a picture.
5. Click **Use this layout**.
6. Enter a clear **Page title**.
7. Enter a short **Short introduction**.
8. Open **Page link and menu settings**.
9. Check the **Page address**.
10. Use only lower-case letters, numbers and hyphens in the address.
11. Tick **Show this page in the main menu** only if students should see it in the main menu.
12. Open each page section.
13. Replace the starter wording with your own wording.
14. Add or remove paragraphs, key points and images as needed.
15. Move the sections into the correct order.
16. Click **Preview**.
17. Read the whole page before publishing.

> **Warning:** Changing a page address later changes its web link. Old bookmarks may stop working.

## 7. Moving, duplicating or deleting sections

### Move a section with a mouse

1. Find the section in the page builder or visual preview.
2. Point to its dotted drag handle.
3. Hold down the mouse button.
4. Drag the section to its new position.
5. Release the mouse button.
6. Check the new order.

### Move a section without dragging

1. Find the section.
2. Click the **up arrow** to move it one place up.
3. Click the **down arrow** to move it one place down.
4. Repeat until it is in the correct place.

### Duplicate a section

1. Find the section.
2. Click the **copy** button.
3. A copy appears beside the original.
4. Open the copy.
5. Change its heading and content.

### Delete a section

1. Find the section.
2. Click the **bin** button.
3. Read the confirmation message.
4. Click **OK** only if the correct section is named.

> **Warning:** Check the section name before confirming a deletion. Use **Undo** immediately if you delete the wrong item.

## 8. Previewing before publishing

### Preview a revision topic

1. Open **Edit the site**.
2. Choose **Revision Topic**.
3. Choose the qualification and topic.
4. Use **Desktop** to check a wide screen.
5. Use **Phone** to check a small screen.
6. Scroll from the top to the bottom.
7. Check headings, paragraphs, bullet points, pictures and captions.

### Preview an extra page

1. Open **More content and tools**.
2. Click **Extra pages**.
3. Choose the page.
4. Click **Preview**.
5. Click **Keep editing** to return to the editor.

Before publishing, check:

1. Is the wording easy for students to understand?
2. Is the qualification correct?
3. Are facts and answers correct?
4. Are images clear on a phone?
5. Does every image have a useful description?
6. Are links correct?
7. Have you removed all starter or placeholder wording?

## 9. Publishing changes

Publishing sends the complete draft to GitHub. GitHub then rebuilds the student website.

1. Check that the Studio says **Draft saved**.
2. Click **Publish changes**.
3. Read **Automatic content check**.
4. If it says an item needs attention, fix the named item first.
5. Return to **Publish changes**.
6. Check that it says **Everything required is present**.
7. Check that **GitHub is connected**.
8. Enter a short note describing the change. For example: `Add R068 coursework guidance`.
9. Tick **I have previewed the changes and want to publish this version**.
10. Click **Publish to the live website**.
11. Do not close the page while publishing is in progress.
12. Wait for **Published successfully**.
13. Click **Watch deployment** if you want to see GitHub's progress.
14. Wait about one minute.
15. Click **Open live site**.
16. Open the changed page and check it once more.

If publishing shows an error, the live site normally stays on its previous version. Read the error and do not keep clicking the publish button repeatedly.

## 10. Undo, backups and recovery

### Undo or redo a recent change

1. Use **Undo** at the top of the Studio to reverse the latest change.
2. Use **Redo** to put an undone change back.
3. Check the preview after using either button.

### Download a backup

Do this before a large change and before deleting a page.

1. Open **Backups and reset** in the left-hand menu.
2. Click **Download a backup**.
3. Save the JSON file in a safe folder.
4. Do not edit the JSON file by hand.

### Restore a backup

1. Open **Backups and reset**.
2. Click **Restore a backup**.
3. Choose a backup JSON file downloaded from this Studio.
4. Wait for the confirmation message.
5. Preview the restored draft.
6. Publish only when you are certain it is the correct version.

### Replace the draft with the live website

Use this when you want to abandon all unpublished changes on this computer.

1. Download a backup first.
2. Open **Backups and reset**.
3. Click **Replace draft with live site**.
4. Read the warning.
5. Confirm only if you want to discard the current draft.

GitHub also keeps published versions. A repository owner can restore an older published commit if a problem is discovered after publishing.

## 11. Common problems

### “My draft is missing on another computer”

This is expected. Drafts save in one browser on one computer.

1. On the first computer, download a backup.
2. Move the backup file securely to the second computer.
3. On the second computer, open **Backups and reset**.
4. Choose **Restore a backup**.

Do not let two people edit separate old drafts at the same time. The last person to publish can replace the other person's published changes because each publish sends one complete content version.

### “The Studio asks me to create a login again”

You may be using a different browser, a different Windows account, private browsing, or cleared browser data.

1. Return to the browser normally used for editing, or
2. Create a new local Studio login on this browser, then
3. Reconnect GitHub before publishing.

### “I have forgotten the Studio password”

1. Click **Forgotten the login? Create a new one on this computer**.
2. Read the warning.
3. Create a new local username and password.
4. Reconnect GitHub.

The saved draft should remain, but the old encrypted GitHub connection cannot be opened with the new login.

### “GitHub did not accept the token”

Check that:

1. The token was copied in full.
2. The token has not expired.
3. The GitHub account can write to the repository.
4. The token has permission to write repository contents.
5. The colleague has accepted the collaborator invitation.

If a collaborator cannot select this repository when creating a fine-grained token, see the collaborator warning in section 1. Do not use or share another person's token.

### “Publish is greyed out”

Check that:

1. The automatic content check has passed.
2. GitHub is connected.
3. The confirmation box is ticked.
4. Required image descriptions and other required fields are complete.

### “The new page is not in the menu”

1. Open **Extra pages**.
2. Choose the page.
3. Open **Page link and menu settings**.
4. Tick **Show this page in the main menu**.
5. Preview and publish again.

### “The picture will not upload”

1. Check that the file is PNG, JPEG or WebP.
2. Try a smaller image.
3. Check that the image file opens normally on the computer.
4. Try choosing the file instead of dragging it.

### “The live website has not changed yet”

1. Wait two minutes.
2. Refresh the live page.
3. Open **Watch deployment** from the publish success message.
4. Check whether the newest GitHub Pages job has finished.
5. If it failed, do not publish repeatedly. Ask the repository owner to inspect the failed job.

## Safe working routine

For every editing session:

1. Open the Studio in the usual browser.
2. Download a backup before a large change.
3. Make one clear group of changes.
4. Preview on desktop and phone.
5. Read the automatic checks.
6. Publish with a clear version note.
7. Check the live page.
8. Tell other editors that a new version is live.

