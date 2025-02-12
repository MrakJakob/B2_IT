####  B2-IT naloga: Preprosta spletna stran s podatki iz strežnika
Preprosta spletna stran, ki prikazuje podatke, pridobljene iz strežnika v obliki tabele. Možno je:
- Dodajanje in brisanje podatkov v tabelo.
- Shranjevanje podatkov lokalno (samo v prikazani tabeli) ali na strežnik.
- Podatki so na strežniku shranjeni v obliki JSON objekta.

Tabela ima implementirano tudi paginacijo, ki omogoča prikazovanje le določenega števila vrstic na stran. Število prikazanih vrstic je odvisno ali spletno stran obišče uporabnik z mobilno napravo ali računalnikom.
Podatki shranjeni lokalno se izgubijo ob osvežitvi strani. Podatki shranjeni na serverju se zgunijo ob ponovnem zagonu serverja. Za preprečitev izgube podatkov bi bilo potrebno podatke shranjevati v bazo podatkov.

#### Zahteve za zagon
- .NET SDK (vsaj .NET 7.0 ali novejši) 
- Python (vsaj Python 3.x, priporočljivo 3.9 ali novejši)
- PowerShell  

#### Zagon
1. Odpri PowerShell in pojdi v mapo projekta:
```powershell
cd "pot/do/projekta"
```
1. Za zagon serverja za backend in frontend je potrebno pognati skripto:
```powershell
.\start_servers.ps1
```
2. Spletna stran je dostopna na naslovu `http://localhost:8000/`.