import { MenuItem, SeatingZone, JournalArticle } from './types';
import truffleChitarra from '@/assets/truffle_chitarra.jpg';
import obsidianSalon from '@/assets/obsidian_salon.jpg';


export const menuItems: MenuItem[] = [
  {
    id: 'm1',
    name: 'A5 Wagyu Beef Tartare',
    description: 'Bespoke hand-cut Miyazaki wagyu, preserved egg yolk emulsion, pickled mustard seed, wild chives, and toasted brioche shards.',
    price: 38,
    category: 'appetizer',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZV9Ja2LmNc7R87_s_urMy0HcDAk8-sO0K3AI-YCXjiWH3A4_JthyedLq5HxBbsVVR52iC9UaBTu91eRj-4Io0kVDbNYmMwsckSBgj1JdzAU82L0RcjbjZzZKD1J3sqSoxryDeBPYfBnmqUlAHLcbFDxXblVWc6CvaqkZ9-cB5wAlc5K5IVHZH_go7daIBxtMJwQMwLbuBYG2jNbEVpVBXRjvi045JbMnkCrwXRkgvA9o_ia9uHL2-G1Z-yS-oDN5zT2ihd4ZkHMk',
    winePairing: '2018 Chateau Margaux Bordeaux',
    ingredients: ['A5 Miyazaki Wagyu', 'Preserved Egg Yolk', 'Pickled Mustard Seed', 'Chives', 'Brioche Shards'],
    dietaryTags: ['Nut-Free'],
    popular: true
  },
  {
    id: 'm2',
    name: 'Handcrafted Truffle Chitarra',
    description: 'Heritage egg pasta spun through brass dyes, organic pasture butter, fresh grated Umbrian black winter truffles, and edible 24k gold leaf flakes.',
    price: 46,
    category: 'main',
    imageUrl: truffleChitarra,
    winePairing: '2019 Domaine de la Romanée-Conti Pinot Noir',
    ingredients: ['Heritage Egg Pasta', 'Umbrian Black Truffles', 'Pasture Butter', '24k Gold Leaf', 'Aged Parmigiano-Reggiano'],
    dietaryTags: ['Vegetarian', 'Nut-Free'],
    popular: true
  },
  {
    id: 'm3',
    name: 'Live Fire Oak-Grilled Duck Breast',
    description: 'Hearth-roasted spiced duck breast, scorched fig reduction, caramelized parsnip silk, and charred wild ramp stems.',
    price: 44,
    category: 'main',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEku8LM5dZRr4qAym1aAn4jN6rKfesku272hiuWWCPZIZ0RZZmN_sYKAPqSjqcWogaInQzABli3ymc7RUhwVNJAz9Iq38_LptK-gJ0LcjAng8OPKxTI--_NCUKfKeJoq03_Vcm8grSo5dsYKgNcs8ZPe7XXB9EbWHQxd9tTg5hIM8ilO4QdPxGsuYLokj5wigcPHfe0qfb2wm_yKjgeHGC7urzkeh2cgtttMKWiMo7QnDClGyT1iZp4KNqfPy7Qk4CpqT6CD_2j1I',
    winePairing: '2016 Barolo Cannubi DOCG',
    ingredients: ['Oak-Smoked Duck Breast', 'Scorched Fig', 'Parsnip Purée', 'Wild Ramps', 'Star Anise Sauce'],
    dietaryTags: ['Gluten-Free', 'Dairy-Free', 'Nut-Free'],
    popular: false
  },
  {
    id: 'm4',
    name: 'Nocturnal Saffron Lobster Broth',
    description: 'Buttered Maine lobster claw, saffron-infused seafood jus, roasted fennel bulb, and sea asparagus droplets.',
    price: 29,
    category: 'appetizer',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpsFOMCxzSPZD6oPU854YZijV6VqyasdMxeD8e93gezZrE4gkWnmKokgThBQQ-F2Jn6sd6EtIxpBj4k3ZY3rJMcFiu8ir0NphtS4Zq5kx1WsgYRpH9wY7VNYYCqu4vmbwmqFXaFrob3eQCS1L45lVPOEjAmBNoUkZvSiWYqxATspwxJKXA5kWZrA_MpYwF-G77jHnAsDhk-ibwEPWzz_PZjU8FW5NyrwKh3ns0dnW0wOqLDqk2OmQNkj1INWv-o34py-_P0DTEWnw',
    winePairing: '2020 Maison Louis Jadot Chassagne-Montrachet',
    ingredients: ['Maine Lobster', 'Kashmiri Saffron', 'Fennel Bulb', 'Sea Asparagus', 'Seafood Reduction'],
    dietaryTags: ['Gluten-Free', 'Nut-Free'],
    popular: false
  },
  {
    id: 'm5',
    name: 'Botanical Gin & Hibiscus Sour',
    description: 'Artisanal local botanical gin, wild hibiscus petal reduction, fresh citrus press, elderflower mist, and organic foam.',
    price: 22,
    category: 'cocktail',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM_wxEpQ4_aKc5uNVFXrYwCUwstYw0li0pZehyKCfcIt98LgK55SFp4xfKBEqI961WQLI-WBdpXTXl0OF4H4c9U2JPKISKhuxx12re5KxkGyT5ziM6G18XHh7i5BisJg0zjb-TGPUnfbNIKyVOxFJZVZHDNTqR6XGxu7wfIRVqS2dlNHnQuEpJ-_4ltf5LS83ZHx0MnEhEUzZlFrHClvjM0ark-BRlAJ-t547jtCz7sk7Z6zU8PTEJXInp7nOTP1Iyys_R7jPQs0c',
    winePairing: 'Sip standalone as a palette opener',
    ingredients: ['Botanical Gin', 'Hibiscus Petals', 'Fresh Lemon Juice', 'Elderflower Mist', 'Egg White Foam'],
    dietaryTags: ['Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'],
    popular: true
  },
  {
    id: 'm6',
    name: 'Smoked Rosemary Old Fashioned',
    description: 'Double-casked rye whiskey, hand-pressed aromatic bitters, demerara sugar, torched rosemary sprig, and clear solid ice cube.',
    price: 24,
    category: 'cocktail',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQZi5jEsWNC2kI5nfmhcrhLPLz3NF-pccHqZqsYl97ntNuomPJ03TrOdzJrdolJu9EQaEBJywA9kzzBD7scIhIMKGq3FSYFWfyW8QLlCH4XPuUaOumr1alcN4LcFdGTAe2VO7b8BpoMveln8uVMgC8dvEj1C64WauBzpgXepIJCq6skQrTkiAtij-ZNBQ79fDUR0Gh8rLdn-RKbwUOM16qqUaHPisrTMi6bsKcBdLulPNzotah3XicHNMZPbd3xZHbg9JoBSQbSi8',
    winePairing: 'Pairs masterfully with red meats',
    ingredients: ['Double Cask Rye Whiskey', 'Angostura Bitters', 'Demerara Nectar', 'Smoked Fresh Rosemary', 'Orange Oil'],
    dietaryTags: ['Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'],
    popular: false
  },
  {
    id: 'm7',
    name: 'Midnight Obsidian Ganache',
    description: '74% single-origin Madagascan dark chocolate dome, sea-salted liquid caramel core, blackberry fluid gel, and black sesame wafer.',
    price: 18,
    category: 'dessert',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMU4zvYWkJ4IQv_x_Y0dQiV4Goh6E9PPGW5l7-qvVs7QKfcVRchWUYCRsXYDy9F89bFDlo-RDUWeAUDlhAczvJTVmxxYyiHFUBYxDCDQv9EBrGyypV9utAkxC5IUBHFxcR3nNAiZwuWLxhdMaiaVQXIU8MPYvdTNapIY-l4kDseUdFYH69YqybPNC_Axo1-OmV3yOSZLtmoHQ8M7gjcHvHnud6GUnkDKUiaF8Ivw9I6TXBbK-ZrKt5MhhXMRgw12_X4FzSQgfALfg',
    winePairing: '10-Year Tawny Port',
    ingredients: ['74% Single-Origin Dark Chocolate', 'Sea Salt', 'Blackberry Purée', 'Black Sesame Seed', 'Pastry Cream'],
    dietaryTags: ['Vegetarian', 'Nut-Free'],
    popular: true
  }
];

export const seatingZones: SeatingZone[] = [
  {
    id: 'z1',
    name: 'The Live Fire Hearth Counter',
    description: 'Seat yourself in the absolute center of our performance. Watch our head chefs manipulate wood coals and open hearth fire directly, with sensory engagement and curated dialogue.',
    capacityInfo: '1-4 Guests • Intimate Seating',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZV9Ja2LmNc7R87_s_urMy0HcDAk8-sO0K3AI-YCXjiWH3A4_JthyedLq5HxBbsVVR52iC9UaBTu91eRj-4Io0kVDbNYmMwsckSBgj1JdzAU82L0RcjbjZzZKD1J3sqSoxryDeBPYfBnmqUlAHLcbFDxXblVWc6CvaqkZ9-cB5wAlc5K5IVHZH_go7daIBxtMJwQMwLbuBYG2jNbEVpVBXRjvi045JbMnkCrwXRkgvA9o_ia9uHL2-G1Z-yS-oDN5zT2ihd4ZkHMk',
    additionalCost: 15
  },
  {
    id: 'z2',
    name: 'Glass Greenhouse Conservatory',
    description: 'Overlook the Manhattan cityscape inside an architectural marvel of vaulted glass panels, surrounded by nocturnal jasmine plants, casting soft botanical shadows.',
    capacityInfo: '2-6 Guests • Spectacular Views',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEku8LM5dZRr4qAym1aAn4jN6rKfesku272hiuWWCPZIZ0RZZmN_sYKAPqSjqcWogaInQzABli3ymc7RUhwVNJAz9Iq38_LptK-gJ0LcjAng8OPKxTI--_NCUKfKeJoq03_Vcm8grSo5dsYKgNcs8ZPe7XXB9EbWHQxd9tTg5hIM8ilO4QdPxGsuYLokj5wigcPHfe0qfb2wm_yKjgeHGC7urzkeh2cgtttMKWiMo7QnDClGyT1iZp4KNqfPy7Qk4CpqT6CD_2j1I',
    additionalCost: 20
  },
  {
    id: 'z3',
    name: 'The Sommelier Vault',
    description: 'Enveloped by limestone walls housing over 4,000 vintage labels, this temperature-controlled cellar table offers customizable wine flights curated dynamically for your table.',
    capacityInfo: '2-8 Guests • Wine Aficionado Focus',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQZi5jEsWNC2kI5nfmhcrhLPLz3NF-pccHqZqsYl97ntNuomPJ03TrOdzJrdolJu9EQaEBJywA9kzzBD7scIhIMKGq3FSYFWfyW8QLlCH4XPuUaOumr1alcN4LcFdGTAe2VO7b8BpoMveln8uVMgC8dvEj1C64WauBzpgXepIJCq6skQrTkiAtij-ZNBQ79fDUR0Gh8rLdn-RKbwUOM16qqUaHPisrTMi6bsKcBdLulPNzotah3XicHNMZPbd3xZHbg9JoBSQbSi8',
    additionalCost: 25
  },
  {
    id: 'z4',
    name: 'The Main Obsidian Salon',
    description: 'A dark, spacious, beautifully acoustically insulated main hall featuring plush leather circular booths and gorgeous directional spotlighting for deep intimacy.',
    capacityInfo: '2-10 Guests • Tonal Comfort',
    image: obsidianSalon,
    additionalCost: 0
  }
];

export const journalArticles: JournalArticle[] = [
  {
    id: 'a1',
    title: 'The Alchemy of Salt: Sourcing Mineral Heritage',
    category: 'CRAFT & TECHNIQUE',
    description: 'Exploring the origins of our signature fleur de sel and how it elevates the profile of our house-aged beef.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpsFOMCxzSPZD6oPU854YZijV6VqyasdMxeD8e93gezZrE4gkWnmKokgThBQQ-F2Jn6sd6EtIxpBj4k3ZY3rJMcFiu8ir0NphtS4Zq5kx1WsgYRpH9wY7VNYYCqu4vmbwmqFXaFrob3eQCS1L45lVPOEjAmBNoUkZvSiWYqxATspwxJKXA5kWZrA_MpYwF-G77jHnAsDhk-ibwEPWzz_PZjU8FW5NyrwKh3ns0dnW0wOqLDqk2OmQNkj1INWv-o34py-_P0DTEWnw',
    author: 'Chef Ethan Sterling',
    readTime: '6 Min Read',
    publishDate: 'June 12, 2026',
    content: `At Bite Boulevard, salt is not merely a seasoning; it is an active transformer of texture and flavor. Our primary mineral of choice, the French hand-harvested Fleur de Sel from Guérande, has a moisture level and mineral count that sets it apart from all industrial salts.

During the scorching summer months, delicate crystals form on the surface of the salt pans. Our salt marsh workers rake them by hand using traditional wooden shovels, ensuring no slate underneath is disturbed.

In our dry-aging chamber, we pack blocks of ancient pink Himalayan rock salt in high-density fans. This slowly desorbs ambient moisture, creating a sterile microclimate where our Prime Wagyu cuts age for 45 days. The result is a concentrated, nut-like beef fat profile that is both savory and intensely sweet. When seared, these crystals create a perfect crispy glass-like bark that yields beautifully to the rare core.`
  },
  {
    id: 'a2',
    title: 'Nocturnal Pairings: A Guide to Full-Bodied Reds',
    category: 'VINICULTURE',
    description: 'Our head sommelier dives into the complexities of high-altitude vineyards and their relationship with fire.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQZi5jEsWNC2kI5nfmhcrhLPLz3NF-pccHqZqsYl97ntNuomPJ03TrOdzJrdolJu9EQaEBJywA9kzzBD7scIhIMKGq3FSYFWfyW8QLlCH4XPuUaOumr1alcN4LcFdGTAe2VO7b8BpoMveln8uVMgC8dvEj1C64WauBzpgXepIJCq6skQrTkiAtij-ZNBQ79fDUR0Gh8rLdn-RKbwUOM16qqUaHPisrTMi6bsKcBdLulPNzotah3XicHNMZPbd3xZHbg9JoBSQbSi8',
    author: 'Sommelier Marcus Laurent',
    readTime: '8 Min Read',
    publishDate: 'July 2, 2026',
    content: `When the sun sinks and our open-hearth fires light up the main obsidian salon, the wine pairing journey truly begins. We seek out high-altitude wines that exhibit intense temperature-shift resilience.

High altitude vines in places like Mendoza, Argentina (2,000+ meters) or the volcanic foothills of Mount Etna, Sicily, receive solar exposure that thickens grape skins. This creates high levels of tannin and anthocyanin, providing deep structure and an almost cosmic blackness in color.

We love pairing these muscular wines with live-fire grilled dishes. For example, our Live Fire Oak-Grilled Duck Breast pairs beautifully with a 2016 Barolo DOCG. The natural acidity and deep red cherry notes of Nebbiolo cut through the duck fat, while its tar and rose aromatics marry with the oak charcoal smoke.`
  },
  {
    id: 'a3',
    title: 'The Architecture of Intimacy',
    category: 'SPACE & FORM',
    description: 'How we designed the Boulevard to become a sanctuary for the senses in the heart of the bustling city.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMU4zvYWkJ4IQv_x_Y0dQiV4Goh6E9PPGW5l7-qvVs7QKfcVRchWUYCRsXYDy9F89bFDlo-RDUWeAUDlhAczvJTVmxxYyiHFUBYxDCDQv9EBrGyypV9utAkxC5IUBHFxcR3nNAiZwuWLxhdMaiaVQXIU8MPYvdTNapIY-l4kDseUdFYH69YqybPNC_Axo1-OmV3yOSZLtmoHQ8M7gjcHvHnud6GUnkDKUiaF8Ivw9I6TXBbK-ZrKt5MhhXMRgw12_X4FzSQgfALfg',
    author: 'Designer Elena Rostova',
    readTime: '5 Min Read',
    publishDate: 'May 28, 2026',
    content: `Stepping off the busy streets of Manhattan, the noise of traffic fades. This is not by accident. Bite Boulevard was designed from the ground up as a sanctuary for the senses.

We chose textured, acoustic plaster walls, thick circular leather booths, and dark basalt tiles to dampen sound frequencies. This ensures that even at full capacity, you can speak in low, hushed tones and still be heard with pristine clarity by your dining partner.

The lighting is calculated to mimic candle-lit conditions. Every table has a focused, warm 2700K spotlight that highlights only the plate and your immediate companion, leaving the surrounding spaces in soft, mysterious shadow. It is an architecture that forces presence, letting the distractions of modern life dissolve.`
  }
];
