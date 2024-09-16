# Mohamed Alsagher (202184957)

- [x] Front-end Web Development
  - <https://github.com/Web-IV/2324-frontendweb-MohamedAlsagher.git>
  - <https://gamestart.onrender.com/>
- [x] Web Services: GITHUB URL
  - <https://github.com/Web-IV/2324-webservices-MohamedAlsagher.git>
  - <https://gamestart-api.onrender.com/>

**Logingegevens**
(verschil tussen beide accounts alleen in backend)

ADMIN:

- Gebruikersnaam/e-mailadres: user1@hotmail.com
- Wachtwoord: 12345678

  USER:

- Gebruikersnaam/e-mailadres: user2@hotmail.com
- Wachtwoord: 12345678

## Projectbeschrijving

Mijn project is een website waar je online games kunt kopen. je kunt browsen in de catalogus en games in winkelmandje steken. je kan een account aanmaken. Wanneer je ingelogd bent met u account kan je eindelijk via winkelmandje gaan 'betalen'. Nadat je de gegeven hebt ingevuld kan je betalen en wordt je terug naar hoofdmenu gestuurd. Daarna kan je naar u profiel gaan om u eigen gegevens te bekijken, aanpassen of zelfs u account te verwijderen. Je hebt ook een pagine bestellingen waar je jou bestel geschiedenis kunt bekijken.

![ERD](./images/image.png)

## Screenshots

![game toevoegen aan winkelmandje](./images/image-1.png)

![registreren](./images/image-3.png)

![inloggen](./images/image-4.png)

![profiel bekijken/aanpassen/verwijderen](./images/image-5.png)

![betalen voor games](./images/image-2.png)

![bestelling geschiedenis bekijken](./images/image-6.png)

## API calls

<https://gamestart-api.onrender.com/swagger/>

## Behaalde minimumvereisten

### Front-end Web Development

- **componenten**

  - [x] heeft meerdere componenten - dom & slim (naast login/register)
  - [x] applicatie is voldoende complex
  - [x] definieert constanten (variabelen, functies en componenten) buiten de component
  - [x] minstens één form met meerdere velden met validatie (naast login/register)
  - [x] login systeem
        <br />

- **routing**

  - [x] heeft minstens 2 pagina's (naast login/register)
  - [x] routes worden afgeschermd met authenticatie en autorisatie
        <br />

- **state-management**

  - [x] meerdere API calls (naast login/register)
  - [x] degelijke foutmeldingen indien API-call faalt
  - [x] gebruikt useState enkel voor lokale state
  - [x] gebruikt gepast state management voor globale state - indien van toepassing
        <br />

- **hooks**

  - [x] gebruikt de hooks op de juiste manier
        <br />

- **varia**

  - [x] een aantal niet-triviale e2e testen
  - [x] minstens één extra technologie
  - [x] maakt gebruik van de laatste ES-features (async/await, object destructuring, spread operator...)
  - [x] duidelijke en volledige README.md
  - [x] volledig en tijdig ingediend dossier en voldoende commits

### Web Services

- **datalaag**

  - [x] voldoende complex (meer dan één tabel, 2 een-op-veel of veel-op-veel relaties)
  - [x] één module beheert de connectie + connectie wordt gesloten bij sluiten server
  - [x] heeft migraties - indien van toepassing
  - [x] heeft seeds
        <br />

- **repositorylaag**

  - [x] definieert één repository per entiteit (niet voor tussentabellen) - indien van toepassing
  - [x] mapt OO-rijke data naar relationele tabellen en vice versa - indien van toepassing
        <br />

- **servicelaag met een zekere complexiteit**

  - [x] bevat alle domeinlogica
  - [x] bevat geen SQL-queries of databank-gerelateerde code
        <br />

- **REST-laag**

  - [x] meerdere routes met invoervalidatie
  - [x] degelijke foutboodschappen
  - [x] volgt de conventies van een RESTful API
  - [x] bevat geen domeinlogica
  - [x] geen API calls voor entiteiten die geen zin hebben zonder hun ouder (bvb tussentabellen)
  - [x] degelijke authorisatie/authenticatie op alle routes
        <br />

- **algemeen**

  - [x] er is een minimum aan logging voorzien
  - [x] een aantal niet-triviale integratietesten (min. 1 controller >=80% coverage)
  - [x] minstens één extra technologie
  - [x] maakt gebruik van de laatste ES-features (async/await, object destructuring, spread operator...)
  - [x] duidelijke en volledige README.md
  - [x] volledig en tijdig ingediend dossier en voldoende commits

## Projectstructuur

### Front-end Web Development

Ik heb de applicatie gestructureerd om het leesbaar te maken en files makkelijk terug te vinden. Ik heb componenten die van hetzelfde "thema" zijn bij elkaar gegroepeerd in een map. bv. map voor css files, map for contextApi, map voor componenten,... Er is niet echt een hiërarchie van componenten want dit vond ik niet zo belangrijk terwijl ik aan met project werkte.

### Web Services

Ik heb de applicatie gestructureerd om het leesbaar te maken en files makkelijk terug te vinden. Ze zijn nogmaals gegroepeerd. bv. alle files voor service laag in map, zelfde voor rest laag en repository laag. Ik maak geen gebruikt van hiërarchie in mijn project want ik vind dit niet zo belangrijk.

## Extra technologie

### Front-end Web Development

ik gebruik React-query als extra technologie. React-query zorgt ervoor dat asynchrone gegevensbeheer vereenvoudigd met behulp van hooks zoals 'useQuery' en 'mutation'. <br />Link naar package: <https://www.npmjs.com/package/react-query/>

### Web Services

als extra functionaliteit heb ik Swagger genomen. Swagger is een tool waarmee je u API documentatie kunt schrijven. Door swagger kan de user online de api's eens testen.<br />Link naar package: <https://www.npmjs.com/package/koa2-swagger-ui/>

## Testresultaten

### Front-end Web Development

#### Bestellingen geschiedenis test

- Bestellingen - Geen bestellingen:<br />
  Beschrijving: Test of de juiste boodschap wordt weergegeven wanneer er geen bestellingen zijn voor de ingelogde gebruiker.
  <br />

- Bestellingen: (2 testen)<br />
  Beschrijving: Test van de basisfunctionaliteit van het tonen van bestellingen en het controleren van de redirect naar de details van een game vanuit een bestelling.

#### Registreer test

- Succesvolle registratie:<br />
  Beschrijving: Test of een nieuwe gebruiker met geldige gegevens succesvol kan registreren.
  <br />

- Fout bij registratie: (8 testen)<br />
  beschrijving: test voor error handeling van foute input.

#### Catalogus test

- Games worden getoond:<br />
  Beschrijving: Test of de games worden weergegeven op de cataloguspagina.
  <br />

- Filterspellen op console:<br />
  Beschrijving: Test of de games correct worden gefilterd op basis van de geselecteerde console.
  <br />

- Games worden toegevoegd aan winkelmandje:<br />
  Beschrijving: Test of het toevoegen van een game aan het winkelmandje correct werkt.
  <br />

- Games-popup kan worden gesloten:<br />
  Beschrijving: Test of de games-popup kan worden geopend en gesloten.

#### Login test

- Succesvol inloggen:<br />
  Beschrijving: Controleer of een gebruiker succesvol kan inloggen met geldige input.
  <br />

- Foutmelding bij gefaalde login:<br />
  Beschrijving: Controleer of een foutmelding wordt weergegeven bij een inlogpoging met ongeldige input.

#### Winkelmandje test

- Hoeveelheid games verhogen:<br />
  Beschrijving: Controleer of het verhogen van de hoeveelheid games in het winkelmandje correct werkt.
  <br />

- Hoeveelheid games verlagen:<br />
  Beschrijving: Controleer of het verlagen van de hoeveelheid games in het winkelmandje correct werkt.
  <br />

- Verwijder game uit mandje:<br />
  Beschrijving: Controleer of het verwijderen van een game uit het winkelmandje correct werkt.
  <br />
- Redirect naar login wanneer niet ingelogd:<br />
  Beschrijving: Controleer of de gebruiker wordt omgeleid naar de inlogpagina wanneer deze probeert af te rekenen zonder ingelogd te zijn.

#### Home pagina test

- Verander naar catalogus:<br />
  Beschrijving: Controleer of de gebruiker succesvol naar de cataloguspagina wordt genavigeerd wanneer er op de catalogusknop wordt geklikt.

### Web Services

#### Users test

- GET /api/users (user role):<br />
  Beschrijving: Test of een gebruiker zijn eigen gegevens kan ophalen met de juiste authenticatie.
  <br />
- GET /api/users (admin role):<br />
  Beschrijving: Test of een admin alle gebruikersgegevens kan ophalen met de juiste authenticatie.
  <br />
- GET /api/users/:id (user role):<br />
  Beschrijving: Test of een gebruiker geen toegang heeft tot de gegevens van een andere gebruiker.
  <br />
- GET /api/users/:id (admin role):<br />
  Beschrijving: Test of een admin toegang heeft tot de gegevens van een specifieke gebruiker.
  <br />
- POST /api/users/register:<br />
  Beschrijving: Test of het registreren van een nieuwe gebruiker correct werkt met de juiste invoer.
  <br />
- POST /api/users/register (duplicaat e-mail):<br />
  Beschrijving: Test of het registreren met een bestaand e-mailadres een fout oplevert.
  <br />
- PUT /api/users/:id (user role - mislukt):<br />
  Beschrijving: Test of een gebruiker zijn eigen gegevens niet kan bijwerken.
  <br />
- PUT /api/users (user role):<br />
  Beschrijving: Test of een gebruiker zijn eigen gegevens kan bijwerken met de juiste authenticatie.
  <br />
- PUT /api/users (user role - ongeldige e-mail):<br />
  Beschrijving: Test of het bijwerken met een ongeldige e-mail een fout oplevert.
  <br />
- PUT /api/users/:id (admin role):<br />
  Beschrijving: Test of een admin de gegevens van een gebruiker kan bijwerken.
  <br />
- DELETE /api/users (user role):<br />
  Beschrijving: Test of een gebruiker zijn eigen account kan verwijderen met de juiste authenticatie.
  <br />
- DELETE /api/users/:id (user role - mislukt):<br />
  Beschrijving: Test of een gebruiker zijn eigen account niet kan verwijderen met onjuiste authenticatie.
  <br />
- DELETE /api/users/:id (admin role):<br />
  Beschrijving: Test of een admin het account van een gebruiker kan verwijderen.

#### Bestelling test

- GET /api/bestelling (user role):<br />
  Beschrijving: Test of een gebruiker alle bestellingen kan ophalen met de juiste authenticatie.
  <br />
- GET /api/bestelling/:id (user role):<br />
  Beschrijving: Test of een gebruiker geen toegang heeft tot specifieke bestellingen met de juiste authenticatie.
  <br />
- GET /api/bestelling/:id (admin role):<br />
  Beschrijving: Test of een admin toegang heeft tot specifieke bestellingen met de juiste authenticatie.
  <br />
- POST /api/bestelling:<br />
  Beschrijving: Test of het aanmaken van een nieuwe bestelling correct werkt met de juiste invoer.

#### Games test

- GET /api/games:<br />
  Beschrijving: Test of het ophalen van de lijst met games correct werkt.

![test coverage](./images/image-7.png)

## Gekende bugs

### Front-end Web Development

- Bij het bijwerken van profiel werkt error handling. Behalve voor "email bestaat al". Voor één of ander reden wordt de fail gezien als een succes en toont geen foutmelding. Mijn code zegt juist dat het wel error handling moet tonen. Dit is nieuwe bug want vroeger werkte het wel.
  <br />
- wanneer ingelogd met een user die rol ADMIN heeft, toon het niet de profiel gegevens wanneer je naar profiel gaat. Als je ingelogd bent met rol user dan zie je u eigen gegevens wel bij profiel<br />
- Bij het runnen van de test met google gebeurt het soms dan maar 2 testen per file runnen en de andere testen hebben een error 'no commands were issued in this test'. Wanneer je het erna bij een andere browser probeert dan werken alle testen.

### Web Services

- Wanneer je yarn test runt of yarn test:coverage dan is er een bug wanneer je voor het eerst runt dat het faalt omdat het eerst users test uitvoert en erna bestellingen test. (hier gebeurt dan iets mis). Wanneer je de test voor een tweede keer runt dan test het eerst bestellingen en erna users en dan werken alle testen zoals het moet en slagen ze.<br />

### Front-end Web Development

- Dit en dat

### Web Services

- Oh en dit ook
