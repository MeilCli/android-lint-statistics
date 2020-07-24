import { parse } from "../src/parse";

const testXml = `<?xml version="1.0" encoding="UTF-8"?>
<issues format="5" by="lint 4.0.0">

    <issue
        id="AllowBackup"
        severity="Warning"
        message="On SDK version 23 and up, your app data will be automatically backed up and restored on app install. Consider adding the attribute \`android:fullBackupContent\` to specify an \`@xml\` resource which configures which files to backup. More info: https://developer.android.com/training/backup/autosyncapi.html"
        category="Security"
        priority="3"
        summary="AllowBackup/FullBackupContent Problems"
        explanation="The \`allowBackup\` attribute determines if an application&apos;s data can be backed up and restored. It is documented at http://developer.android.com/reference/android/R.attr.html#allowBackup&#xA;&#xA;By default, this flag is set to \`true\` which means application data can be backed up and restored by the OS. Setting \`allowBackup=&quot;false&quot;\` opts the application out of being backed up and so users can&apos;t restore data related to it when they go through the device setup wizard.&#xA;&#xA;Allowing backups may have security consequences for an application. Currently \`adb backup\` allows users who have enabled USB debugging to copy application data off of the device. Once backed up, all application data can be read by the user. \`adb restore\` allows creation of application data from a source specified by the user. Following a restore, applications should not assume that the data, file permissions, and directory permissions were created by the application itself.&#xA;&#xA;To fix this warning, decide whether your application should support backup, and explicitly set \`android:allowBackup=(true|false)&quot;\`.&#xA;&#xA;If not set to false, and if targeting API 23 or later, lint will also warn that you should set \`android:fullBackupContent\` to configure auto backup."
        url="https://developer.android.com/training/backup/autosyncapi.html"
        urls="https://developer.android.com/training/backup/autosyncapi.html,http://developer.android.com/reference/android/R.attr.html#allowBackup"
        errorLine1="    &lt;application"
        errorLine2="     ~~~~~~~~~~~">
        <location
            file="Librarian\\sample\\sample-ui-activity\\src\\main\\AndroidManifest.xml"
            line="5"
            column="6"/>
    </issue>

    <issue
        id="MergeRootFrame"
        severity="Warning"
        message="This \`&lt;FrameLayout>\` can be replaced with a \`&lt;merge>\` tag"
        category="Performance"
        priority="4"
        summary="FrameLayout can be replaced with \`&lt;merge>\` tag"
        explanation="If a \`&lt;FrameLayout>\` is the root of a layout and does not provide background or padding etc, it can often be replaced with a \`&lt;merge>\` tag which is slightly more efficient. Note that this depends on context, so make sure you understand how the \`&lt;merge>\` tag works before proceeding."
        url="http://android-developers.blogspot.com/2009/03/android-layout-tricks-3-optimize-by.html"
        urls="http://android-developers.blogspot.com/2009/03/android-layout-tricks-3-optimize-by.html"
        errorLine1="&lt;FrameLayout xmlns:android=&quot;http://schemas.android.com/apk/res/android&quot;"
        errorLine2="^">
        <location
            file="Librarian\\sample\\sample-ui-activity\\src\\main\\res\\layout\\activity_main.xml"
            line="2"
            column="1"/>
    </issue>

</issues>
`;

const testEmptyXml = `<?xml version="1.0" encoding="UTF-8"?>
<issues format="5" by="lint 4.0.0">

</issues>
`;

test("parse", async () => {
    const result = await parse(testXml);
    expect(result.issues.length).toBe(2);
    expect(result.issues[0].severity).toBe("Warning");
    expect(result.issues[0].category).toBe("Security");
    expect(result.issues[0].id).toBe("AllowBackup");
    expect(result.issues[0].priority).toBe(3);
    expect(result.issues[1].severity).toBe("Warning");
    expect(result.issues[1].category).toBe("Performance");
    expect(result.issues[1].id).toBe("MergeRootFrame");
    expect(result.issues[1].priority).toBe(4);
});

test("parseEmpty", async () => {
    const result = await parse(testEmptyXml);
    expect(result.issues.length).toBe(0);
});
