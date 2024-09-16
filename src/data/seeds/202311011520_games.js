exports.seed = function (knex) {
  return knex('games').del()
    .then(function () {
      return knex('games').insert([
        {
          id: 1,
          name: 'Rust',
          beschrijving: "The only aim in Rust is to survive. Everything wants you to die - the island's wildlife and other inhabitants, the environment, other survivors. Do whatever it takes to last another night.",
          prijs: 39.99,
          console: 'pc',
          image_url: 'https://image.api.playstation.com/vulcan/ap/rnd/202103/1501/enihR6QwSYiWCNl2HdPfV6R6.png'
        },
        {
          id: 2,
          name: 'Fifa 23',
          beschrijving: "FIFA 23 brengt The World's Game naar het veld, met HyperMotion2-technologie, het heren- en damestoernooi van de FIFA World Cup™, damesclubteams, cross-playfunctionaliteit** en meer.",
          prijs: 20.00,
          console: 'Xbox One',
          image_url: 'https://media.s-bol.com/3Jx7kE9MAG89/ngMxVP/550x795.jpg'
        },
        {
          id: 3,
          name: 'Minecraft',
          beschrijving: 'Minecraft is a game made up of blocks, creatures, and community. You can survive the night or build a work of art – the choice is all yours. But if the thought of exploring a vast new world all on your own feels overwhelming, then fear not! Let’s explore what Minecraft is all about!',
          prijs: 20.00,
          console: 'pc',
          image_url: 'https://image.api.playstation.com/vulcan/img/cfn/11307x4B5WLoVoIUtdewG4uJ_YuDRTwBxQy0qP8ylgazLLc01PBxbsFG1pGOWmqhZsxnNkrU3GXbdXIowBAstzlrhtQ4LCI4.png'
        },
        {
          id: 4,
          name: 'Red Dead Redemption 2',
          beschrijving: 'Red Dead Redemption 2 is de bejubelde, epische open wereld van Rockstar Games. Het is de best beoordeelde game van deze generatie consoles die nu is verbeterd voor PC met nieuwe content voor de Story Mode, nog mooiere graphics en meer.',
          prijs: 64.99,
          console: 'ps5',
          image_url: 'https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png'
        },
        {
          id: 5,
          name: 'Hogwarts Legacy',
          beschrijving: 'Hogwarts Legacy is een meeslepende actie-RPG in een open wereld. Nu ben jij het middelpunt van de actie en beleef je je eigen avontuur in de tovenaarswereld.',
          prijs: 39.99,
          console: 'pc',
          image_url: 'https://image.api.playstation.com/vulcan/ap/rnd/202011/0919/cDHU28ds7cCvKAnVQo719gs0.png'
        },
        {
          id: 6,
          name: "Tom Clancy's Rainbow Six Siege",
          beschrijving: "Tom Clancy's Rainbow Six® Siege is een hoogwaardige, tactische shooter met teams waarin het om superieure planning en uitvoering draait.",
          prijs: 14.99,
          console: 'ps5',
          image_url: 'https://image.api.playstation.com/vulcan/ap/rnd/202210/2019/S8KTmZMvemfR8yfAqHvLpGIP.jpg'
        },
        {
          id: 7,
          name: 'Ready or Not',
          beschrijving: 'Ready or Not is een intense, tactische first-person shooter waarin een moderne SWAT-eenheid vijanden uit moet schakelen en crises moeten bezweren.',
          prijs: 25.00,
          console: 'Xbox One',
          image_url: 'https://editors.dexerto.com/wp-content/uploads/2022/01/21/readyornot.jpg'
        },
        {
          id: 8,
          name: 'Street Fighter 6',
          beschrijving: 'Hier is Capcoms nieuwe uitdager! Street Fighter™ 6 komt 2 juni 2023 wereldwijd uit en vertegenwoordigt de volgende evolutie van de Street Fighter™-serie! Street Fighter 6 beslaat drie verschillende speltypen: World Tour, Fighting Ground en Battle Hub.',
          prijs: 59.99,
          console: 'ps5',
          image_url: 'https://image.api.playstation.com/vulcan/ap/rnd/202211/1502/azv6nnW8zOcO33WVXUQxogHh.jpg'
        },
        {
          id: 9,
          name: 'Ratchet & Clank: Rift Apart',
          beschrijving: 'Knal je een weg door een avontuur dat dimensies overstijgt met Ratchet en Clank – nu op pc! Help ze om een boosaardige keizer uit een andere realiteit te verslaan terwijl je tussen actievolle werelden en daar voorbij reist.',
          prijs: 39.99,
          console: 'pc',
          image_url: 'https://image.api.playstation.com/vulcan/ap/rnd/202101/2921/DwVjpbKOsFOyPdNzmSTSWuxG.png'
        },
      ]);
    });
};
