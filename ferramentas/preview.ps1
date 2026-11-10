# Gera a prévia PNG de um SVG (ou HTML) com o Edge em modo headless.
# Uso: powershell -File ferramentas\preview.ps1 <arquivo.svg|html> <saida.png> <largura> <altura>
param([string]$Entrada, [string]$Saida, [int]$Largura = 1440, [int]$Altura = 900)
$edge = @("C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe", "C:\Program Files\Microsoft\Edge\Application\msedge.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $edge) { throw "Microsoft Edge não encontrado." }
$perfil = Join-Path $env:TEMP "figma-design-edge-preview"
$url = "file:///" + ((Resolve-Path $Entrada).Path -replace '\\', '/')
$saidaAbs = [IO.Path]::GetFullPath($Saida)
Start-Process -FilePath $edge -ArgumentList @("--headless=new", "--disable-gpu", "--hide-scrollbars", "--user-data-dir=`"$perfil`"", "--window-size=$Largura,$Altura", "--screenshot=`"$saidaAbs`"", $url) -Wait -NoNewWindow
