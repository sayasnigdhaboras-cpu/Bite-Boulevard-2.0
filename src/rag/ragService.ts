import { menuItems, seatingZones, journalArticles } from '../data';

export async function askChatbot(question: string): Promise<string> {
  const q = question.toLowerCase();

  // Simple rule-based retrieval simulation
  
  if (q.includes('vegetarian') || q.includes('vegan') || q.includes('meat-free')) {
    const vegItems = menuItems.filter(item => item.dietaryTags.some(tag => tag.toLowerCase() === 'vegetarian' || tag.toLowerCase() === 'vegan'));
    const names = vegItems.map(item => item.name).join(', ');
    return `We have some wonderful vegetarian and vegan options: ${names}. For example, our Handcrafted Truffle Chitarra is highly recommended.`;
  }

  if (q.includes('gluten') || q.includes('celiac')) {
    const gfItems = menuItems.filter(item => item.dietaryTags.some(tag => tag.toLowerCase() === 'gluten-free'));
    const names = gfItems.map(item => item.name).join(', ');
    return `For gluten-free options, we offer: ${names}. The Live Fire Oak-Grilled Duck Breast is spectacular!`;
  }

  if (q.includes('seating') || q.includes('table') || q.includes('book') || q.includes('reservation') || q.includes('zone')) {
    const zones = seatingZones.map(z => z.name).join(', ');
    return `We have four unique seating zones: ${zones}. You can book them through our reservations page. Our most intimate option is The Live Fire Hearth Counter.`;
  }

  if (q.includes('journal') || q.includes('read') || q.includes('article') || q.includes('salt') || q.includes('wine')) {
    const articles = journalArticles.map(a => a.title).join(', ');
    return `Our journal features insights into our craft. Current articles include: ${articles}.`;
  }

  if (q.includes('menu') || q.includes('food') || q.includes('eat')) {
    const main = menuItems.filter(i => i.category === 'main').map(i => i.name).join(' and ');
    return `Our menu features exquisite dishes like ${main}, along with craft cocktails and delicate desserts.`;
  }

  // Check if they are asking about a specific menu item
  const matchedItem = menuItems.find(item => {
    const lowerQ = q.toLowerCase();
    const nameLower = item.name.toLowerCase();
    const firstName = nameLower.split(' ')[0];
    
    // Check if the query contains the full name, or the first word as a standalone word
    return lowerQ.includes(nameLower) || new RegExp(`\\b${firstName}\\b`).test(lowerQ);
  });
  if (matchedItem) {
    return `${matchedItem.name}: ${matchedItem.description} It costs $${matchedItem.price}.`;
  }

  // Check if they are asking about opening times/hours
  if (q.includes('time') || q.includes('open') || q.includes('hours') || q.includes('close')) {
    return "Bite Boulevard embraces the night. We are open daily from 5:00 PM to 2:00 AM, with our last seating at 1:00 AM.";
  }

  // Check if they are asking about specials, popular items, or recommendations
  if (q.includes('special') || q.includes('recommend') || q.includes('today') || q.includes('popular') || q.includes('best') || q.includes('favorite')) {
    const popularItems = menuItems.filter(item => item.popular);
    if (popularItems.length > 0) {
      const names = popularItems.map(item => item.name).join(', ');
      return `Our most popular dishes include: ${names}. They are absolute house favorites!`;
    }
  }

  // Check if they are asking about portion sizes or modifications
  if (q.includes('portion') || q.includes('half') || q.includes('size') || q.includes('share')) {
    return "Our dishes are meticulously plated for individual dining experiences, so we do not offer half portions. However, many of our appetizers are perfect for sharing.";
  }

  // Fallback
  return "I'm the Bite Boulevard AI assistant. I can answer questions about our menu, dietary options, seating zones, and journal articles. What would you like to know?";
}
