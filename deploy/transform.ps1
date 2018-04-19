param (
    [Parameter(Mandatory=$true, Position=1)]
    [string] $Target,

    [Parameter(Mandatory=$true, Position=2)]
    [string] $Value
 )

$targetFileName = (Get-ChildItem -File $Target  | Select-Object -First 1).FullName
$targetFileContent = Get-Content $targetFileName -Encoding UTF8

$configFile = Get-Content $Value -Raw | ConvertFrom-Json

$configFile | Get-Member -MemberType NoteProperty | % {
    $targetFileContent = $targetFileContent -replace "#{$($_.Name)}" , $configFile.($_.Name)
}

$targetFileContent | Out-File $targetFileName
