# Get the directory where the script is located
$scriptDir = $PSScriptRoot

# Start .NET server in the background (relative path)
$dotnetProcess = Start-Process -FilePath "dotnet" -ArgumentList "run" -WorkingDirectory "$scriptDir\Backend\AjaxJsonDemo" -PassThru -NoNewWindow

# Start Python server in the background (relative path)
$pythonProcess = Start-Process -FilePath "python" -ArgumentList "-m http.server 8000" -WorkingDirectory "$scriptDir\Frontend" -PassThru -NoNewWindow

Write-Host ".NET API is running at: http://localhost:5000/"
Write-Host "Python frontend is running at: http://localhost:8000/"
Write-Host "Press Enter to stop servers."
Write-Host "____________________________"
Write-Host ""
Read-Host

# Stop the actual server processes
Stop-Process -Id $dotnetProcess.Id -Force
Stop-Process -Id $pythonProcess.Id -Force

Write-Host "Servers stopped successfully!"
