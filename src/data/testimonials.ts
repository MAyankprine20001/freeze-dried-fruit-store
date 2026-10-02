/**
 * Real customer feedback collected by The Dry Factory (source: REVIEWS.pdf).
 * Text is kept as the customer wrote it. `rating` is set only where the customer gave stars.
 */

export type ReviewRange = "freeze-fusion" | "sipreal" | "crispy-bites";

export interface Testimonial {
  text: string;
  author: string;
  /** Product(s) the feedback is about, shown under the name. */
  product: string;
  ranges: ReviewRange[];
  rating?: number;
}

export const TESTIMONIALS: Testimonial[] = [
  // ── Freeze Fusion chocolates ──
  { text: "The tasty and amazing part is that there is no artificial flavour or anything; only 100% real fruit.", author: "Chef Shruti Jain", product: "Freeze Fusion Chocolates", ranges: ["freeze-fusion"] },
  { text: "Liked the chocolate! The idea is unique! All the best ❤", author: "Sanchi", product: "Freeze Fusion Chocolates", ranges: ["freeze-fusion"] },
  { text: "Good product, very nice taste.", author: "Pooja Soni", product: "Freeze Fusion Chocolates", ranges: ["freeze-fusion"] },
  { text: "Tastes like real fruit, flavourful. Must try.", author: "Mamta", product: "Freeze Fusion Chocolates", ranges: ["freeze-fusion"] },
  { text: "Innovative, very interesting products. Keep going. Keep growing.", author: "Anjali", product: "Freeze Fusion Chocolates", ranges: ["freeze-fusion"] },
  { text: "Very good taste. Keep it up.", author: "Prerna", product: "Freeze Fusion Chocolates", ranges: ["freeze-fusion"] },
  { text: "Loved the flavour. The chocolates were amazing.", author: "Robin", product: "Freeze Fusion Chocolates", ranges: ["freeze-fusion"] },
  { text: "Taste and texture were good! 5/5 stars.", author: "Ravika", product: "Freeze Fusion Chocolates", ranges: ["freeze-fusion"], rating: 5 },
  { text: "Very tasty, crunchy. Good for a sweet indulgence.", author: "Karan", product: "Freeze Fusion Chocolates", ranges: ["freeze-fusion"] },
  { text: "Really good chocolates. The crunch is superb! ❤", author: "Shantanu", product: "Freeze Fusion Chocolates", ranges: ["freeze-fusion"] },
  { text: "My kids love the Mango Silk White. The crunch is superb, and the couverture chocolates tasted so good.", author: "Dr. Juhi", product: "Freeze Fusion Mango Silk White", ranges: ["freeze-fusion"] },
  { text: "My kids love this duo fruit-infused chocolate. Generally, he avoids fresh banana, but tried the Banana Cocoa; he loved the banana taste.", author: "Dr. Dhirendra", product: "Freeze Fusion Banana Cocoa", ranges: ["freeze-fusion"] },
  { text: "Mango and Strawberry are so good and tasty; must try the strawberry.", author: "Shalini", product: "Freeze Fusion Mango & Strawberry", ranges: ["freeze-fusion"] },

  // ── SipReal smoothie premix ──
  { text: "Everything is tasty and healthy.", author: "Jyoti Sharma", product: "SipReal Smoothie Premix", ranges: ["sipreal"] },
  { text: "Liked the smoothies. Interesting and innovative products.", author: "Anhad Kumar", product: "SipReal Smoothie Premix", ranges: ["sipreal"] },
  { text: "The strawberry and mango were amazing, and kudos to you. Good luck.", author: "Simran", product: "SipReal Strawberry & Mango", ranges: ["sipreal"] },
  { text: "The Banana Power smoothie was amazing. It's a must-try, guys. Every penny is worth a shot. Amazing perfect flavour & amazing taste 🙂", author: "Swarnim", product: "SipReal Banana Power", ranges: ["sipreal"] },
  { text: "SipReal – Mango 5/5 stars, Freeze Fusion – Mango Silk 4 stars, Banana Cocoa 3 stars.", author: "Gaurav", product: "SipReal Royal Mango & Freeze Fusion", ranges: ["sipreal", "freeze-fusion"] },
  { text: "I really like the taste of SipReal.", author: "Saran N", product: "SipReal Smoothie Premix", ranges: ["sipreal"] },
  { text: "My husband tried it and he liked it. Has no sugar added, which is the best part.", author: "Darshan", product: "SipReal Smoothie Premix", ranges: ["sipreal"] },

  // ── Crispy Bites ──
  { text: "Crunch is superb, tastes like real mango. Best part: no preservatives, nothing, only 100% real fruit.", author: "Mayank", product: "Crispy Bites Mango", ranges: ["crispy-bites"] },
  { text: "The fruit pops; I personally loved the Mango! My sister really liked the Jamun.", author: "Deborah Jami", product: "Crispy Bites Mango & Jamun", ranges: ["crispy-bites"] },
  { text: "Jamun is healthy. It's completely replaceable for junk snacks.", author: "Dr. Deepak", product: "Crispy Bites Jamun", ranges: ["crispy-bites"] },
];

export const testimonialsFor = (range: ReviewRange) => TESTIMONIALS.filter((t) => t.ranges.includes(range));
