& {
Add-Type -AssemblyName System;
Add-Type -AssemblyName System.Windows.Forms;
Add-Type -AssemblyName System.Drawing;
Add-Type -AssemblyName System.IO;
$mainForm = New-Object System.Windows.Forms.Form;
$mainForm.Font = New-Object System.Drawing.Font("Segoe UI",9, [System.Drawing.FontStyle]::Regular,[System.Drawing.GraphicsUnit]::Point,[byte]204);
$mainForm.Size = New-Object System.Drawing.Size(300,300);
$mainForm.MinimumSize = New-Object System.Drawing.Size(300,300);
$mainForm.Text = "Simple IMG Viewer";
$mainForm.StartPosition = [System.Windows.Forms.FormStartPosition]::CenterScreen;
$img = New-Object System.Windows.Forms.PictureBox;
$img.SizeMode = [System.Windows.Forms.PictureBoxSizeMode]::Zoom;
$img.Location = New-Object System.Drawing.Point(0,0);
$img.Size = New-Object System.Drawing.Size(300,230);
$img.BorderStyle = [System.Windows.Forms.BorderStyle]::FixedSingle;
$img.Anchor = ([System.Windows.Forms.AnchorStyles]::Top, [System.Windows.Forms.AnchorStyles]::Left, [System.Windows.Forms.AnchorStyles]::Right, [System.Windows.Forms.AnchorStyles]::Bottom);
$btnOpen = New-Object System.Windows.Forms.Button;
$btnOpen.Text = 'Open';
$btnOpen.Anchor = [System.Windows.Forms.AnchorStyles]::Bottom, [System.Windows.Forms.AnchorStyles]::Left;
$btnOpen.Size = New-Object System.Drawing.Size(70,30);
$btnOpen.Location = New-Object System.Drawing.Point(3,230);
$btnOpen.Add_Click({
	$ofd = New-Object System.Windows.Forms.OpenFileDialog;
	$ofd.Filter = 'images|*.png;*.jpg;*.jpeg;*.bmp';
	If ($ofd.ShowDialog() = [System.Windows.Forms.DialogResult]::OK) {
		$img.ImageLocation = $ofd.FileName;
        $btnSaveAs.Enabled = 1;
	}
})

$btnSaveAs = New-Object System.Windows.Forms.Button;
$btnSaveAs.Text = 'Save As';
$btnSaveAs.Enabled = 0;
$btnSaveAs.Anchor = [System.Windows.Forms.AnchorStyles]::Bottom, [System.Windows.Forms.AnchorStyles]::Left;
$btnSaveAs.Size = New-Object System.Drawing.Size(70,30);
$btnSaveAs.Location = New-Object System.Drawing.Point(75,230);
$btnSaveAs.Add_Click({
	$sfd = New-Object System.Windows.Forms.SaveFileDialog;
	$sfd.Filter = 'images|*.png;*.jpg;*.jpeg;*.bmp';
	If ($sfd.ShowDialog() = [System.Windows.Forms.DialogResult]::OK) {
		$img.Image.Save($sfd.FileName);
        System.Windows.Forms.MessageBox.Show('Saved!','',[System.Windows.Forms.MessageBoxButtons]::OK,[System.Windows.Forms.MessageBoxIcon]::Information);
	}
})

$mainForm.Controls.Add($img);
$mainForm.Controls.Add($btnOpen);
$mainForm.Controls.Add($btnSaveAs);
$mainForm.ShowDialog();
}