export const STORE_CONFIG = {
  STORE_NAME: "TALICA INVESTMENTS",
  CURRENCY: "KSh",
  DEFAULT_COUNTRY: "Kenya",
  WHATSAPP_NUMBER: "+254702675717",
  CONTACT_EMAIL: "shut92759@hotmail.com",
  
  PRODUCTS: [
    {
      id: "p1",
      name: "Premium L-Shaped Sofa",
      category: "Furniture",
      price: 45000,
      description: "Luxurious 5-seater L-shaped sofa with premium fabric. Perfect for modern Kenyan living rooms.",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
      variants: ["Grey", "Navy Blue", "Beige"]
    },
    {
      id: "p2",
      name: "Samsung 55\" 4K Smart TV",
      category: "Electronics",
      price: 65000,
      description: "Crystal clear 4K UHD resolution with built-in smart features, Netflix, and YouTube.",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800",
      variants: ["Standard"]
    },
    {
      id: "p3",
      name: "Toyota Vitz 2016 (Import)",
      category: "Cars",
      price: 1200000,
      description: "Clean, low mileage, fuel-efficient hatchback. Perfect for Kenyan traffic.",
      image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80&w=800",
      variants: ["Silver", "White", "Black"]
    },
    {
      id: "p4",
      name: "Men's Designer Suit",
      category: "Clothes",
      price: 8500,
      description: "Sharp, slim-fit 3-piece suit ideal for weddings and corporate events.",
      image: "https://images.unsplash.com/photo-1594938298598-70f70f36f026?auto=format&fit=crop&q=80&w=800",
      variants: ["Size 48", "Size 50", "Size 52"]
    },
    {
      id: "p5",
      name: "Pro Treadmill",
      category: "Sports",
      price: 85000,
      description: "Heavy-duty motorized treadmill for home workouts. Foldable design.",
      image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80&w=800",
      variants: ["Standard"]
    },
    {
      id: "p6",
      name: "Modern Dining Set (6 Seater)",
      category: "Furniture",
      price: 55000,
      description: "Elegant glass-top dining table with 6 comfortable upholstered chairs.",
      image: "https://images.unsplash.com/photo-1617806118233-18e1c0945594?auto=format&fit=crop&q=80&w=800",
      variants: ["Black/Glass", "Wood/White"]
    }
  ],
  
  // Supabase Configuration
  SUPABASE_URL: "https://jjspnjgfcmopcdxkskfs.supabase.co",
  SUPABASE_PUBLISHABLE_KEY: "sb_publishable_0NO3swuRALY7dOVJIEo4vQ__2r-oE7O"
};
