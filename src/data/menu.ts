/**
 * Data menu Mosa Coffee House.
 * Harga ditulis dalam RIBUAN rupiah (33 = Rp 33.000, 7.5 = Rp 7.500).
 */
export interface MenuOption {
  name: string;
  price: number;
}

export interface MenuItem {
  name: string;
  /** Harga tunggal (makanan / minuman tanpa varian suhu) */
  price?: number;
  /** Harga varian panas */
  hot?: number;
  /** Harga varian dingin */
  cold?: number;
  /** Keterangan varian / pilihan rasa */
  note?: string;
  spicy?: boolean;
  /** Sub-kelompok di dalam kategori (opsional) */
  group?: string;
  /** Pilihan dengan harga berbeda-beda (mis. Juice) */
  options?: MenuOption[];
}

export interface MenuAddon {
  name: string;
  price: number;
}

export interface MenuCategory {
  id: string;
  label: string;
  tagline: string;
  kind: "food" | "drink";
  items: MenuItem[];
  additional?: {
    title: string;
    description: string;
    items: MenuAddon[];
  };
}

export const menuCategories: MenuCategory[] = [
  {
    id: "coffee-tea",
    label: "Coffee & Tea",
    tagline:
      "Espresso based, es kopi susu, manual brew, hingga teh pilihan — diseduh dengan takaran yang pas.",
    kind: "drink",
    items: [
      { group: "Espresso Based", name: "Espresso", hot: 21 },
      { group: "Espresso Based", name: "Americano", hot: 21, cold: 22 },
      { group: "Espresso Based", name: "Cappuccino", hot: 28, cold: 29 },
      { group: "Espresso Based", name: "Magic", hot: 30 },
      { group: "Espresso Based", name: "Latte", hot: 28, cold: 29 },
      { group: "Espresso Based", name: "Affogato", cold: 29 },
      { group: "Espresso Based", name: "Caramel Macchiato", cold: 30 },
      { group: "Espresso Based", name: "Creme Brule", hot: 31, cold: 32 },
      { group: "Espresso Based", name: "Sea Salt Caramel Latte", cold: 30 },
      { group: "Espresso Based", name: "Butterscotch Latte", cold: 30 },
      { group: "Espresso Based", name: "Dirty Latte", cold: 31 },
      { group: "Es Kopi Susu", name: "Es Kopi Susu", cold: 29 },
      { group: "Es Kopi Susu", name: "Es Kopi Susu 250 ml", cold: 36 },
      { group: "Es Kopi Susu", name: "Es Kopi Susu 500 ml", cold: 66 },
      { group: "Es Kopi Susu", name: "Es Kopi Susu 1 Liter", cold: 116 },
      { group: "Manual Brew", name: "Manual Brew Japanese", cold: 31 },
      { group: "Manual Brew", name: "Manual Brew V60", hot: 30 },
      { group: "Manual Brew", name: "Manual Brew Japanese Lemon", cold: 31 },
      { group: "Manual Brew", name: "Manual Brew Vietnam Drip", hot: 30 },
      { group: "Manual Brew", name: "Kopi Tubruk", hot: 18 },
      { group: "Tea & Mojito", name: "Tea", hot: 14, cold: 15 },
      { group: "Tea & Mojito", name: "Lychee Tea", hot: 22, cold: 23 },
      { group: "Tea & Mojito", name: "Mango Tea", cold: 27 },
      { group: "Tea & Mojito", name: "Lemon Tea", hot: 22, cold: 23 },
      { group: "Tea & Mojito", name: "Lemon Grass Tea", hot: 24, cold: 25 },
      { group: "Tea & Mojito", name: "Peach Tea", cold: 25 },
      {
        group: "Tea & Mojito",
        name: "Mojito",
        cold: 27,
        note: "Pilihan: Lemon, Orange, Raspberry, Lychee, Mango",
      },
    ],
    additional: {
      title: "Additional",
      description: "Tambahan untuk minuman",
      items: [
        { name: "Extra Syrup", price: 8 },
        { name: "Extra Shoot Espresso", price: 10 },
        { name: "Extra Ice Cream", price: 10 },
        { name: "Oatside", price: 10 },
      ],
    },
  },
  {
    id: "non-coffee",
    label: "Non-Coffee & Mocktail",
    tagline:
      "Pilihan segar tanpa kopi: latte, squash, milkshake, jus buah, hingga mocktail warna-warni.",
    kind: "drink",
    items: [
      { group: "Signature & Latte", name: "Jeruk Nipis", hot: 25, cold: 26 },
      { group: "Signature & Latte", name: "Matcha Latte", hot: 31, cold: 32 },
      { group: "Signature & Latte", name: "Thai Tea", hot: 28, cold: 29 },
      { group: "Signature & Latte", name: "Green Tea Latte", hot: 28, cold: 29 },
      { group: "Signature & Latte", name: "Chocolate", hot: 29, cold: 30 },
      { group: "Signature & Latte", name: "Klepon", hot: 29, cold: 30 },
      { group: "Signature & Latte", name: "Honey Lemon", hot: 26, cold: 27 },
      { group: "Squash & Refresher", name: "Es Soda Gembira", cold: 27 },
      { group: "Squash & Refresher", name: "Mango Squash", cold: 27 },
      { group: "Squash & Refresher", name: "Orange Squash", cold: 27 },
      { group: "Squash & Refresher", name: "Strawberry Matcha", cold: 33 },
      { group: "Squash & Refresher", name: "Mineral Water", cold: 7.5 },
      {
        group: "Milkshake, Ice Cream & Juice",
        name: "Milkshake",
        cold: 35,
        note: "Pilihan: Strawberry, Coklat, Mango",
      },
      {
        group: "Milkshake, Ice Cream & Juice",
        name: "Ice Cream",
        cold: 24,
        note: "Pilihan: Jeruk, Lychee, Oreo",
      },
      {
        group: "Milkshake, Ice Cream & Juice",
        name: "Juice",
        options: [
          { name: "Fresh Orange", price: 35 },
          { name: "Strawberry", price: 30 },
          { name: "Pineapple", price: 30 },
          { name: "Healthy Green Juice", price: 30 },
        ],
      },
      { group: "Mocktail", name: "Ice Lemonade Coffee", cold: 29 },
      { group: "Mocktail", name: "Ice Raspberry Coffee", cold: 29 },
      { group: "Mocktail", name: "Ice Coffee Sweet & Sour", cold: 29 },
      { group: "Mocktail", name: "Lychee n Friends", cold: 28 },
      { group: "Mocktail", name: "Berry Merry", cold: 28 },
      { group: "Mocktail", name: "Blue Delight", cold: 28 },
    ],
  },
  {
    id: "breakfast",
    label: "Breakfast / All Day",
    tagline: "Sarapan santai yang bisa dinikmati kapan saja sepanjang hari.",
    kind: "food",
    items: [
      { name: "Big Brekkie", price: 45 },
      { name: "Club Sandwich", price: 42 },
      {
        name: "Roti Bakar",
        price: 30,
        note: "Selai Kacang / Selai Strawberry / Coklat Susu / Keju Susu",
      },
      { name: "Tuna Sandwich", price: 54 },
      { name: "Carbonara Sandwich", price: 58 },
      { name: "Stroganoff Sandwich", price: 58 },
    ],
  },
  {
    id: "light-meals",
    label: "Light Meals",
    tagline: "Camilan hangat, teman setia ngobrol panjang dan secangkir kopi.",
    kind: "food",
    items: [
      { name: "Pisang Goreng", price: 33 },
      { name: "Pisang Bakar", price: 33 },
      { name: "Bala - Bala", price: 33 },
      { name: "Singkong Goreng", price: 33 },
      { name: "Pempek Dos", price: 31 },
      { name: "Pempek Lenggang", price: 33 },
      { name: "Bakso Goreng", price: 31 },
      { name: "Kentang Goreng", price: 28 },
      { name: "Kentang Sosis", price: 30 },
      { name: "Tahu Goreng Pedas", price: 31, spicy: true },
      { name: "Mix Platter", price: 45 },
      { name: "Gohyong", price: 39 },
      { name: "Pangsit Rebus", price: 39 },
      { name: "Pangsit Goreng", price: 39 },
      { name: "Kwetiau Pangsit Chili Oil", price: 39 },
      { name: "Peyeum Bakar", price: 33 },
    ],
  },
  {
    id: "meals",
    label: "Meals",
    tagline: "Hidangan utama — dari nasi goreng khas hingga pasta dan Indomie ala Mosa.",
    kind: "food",
    items: [
      { group: "Nasi Goreng", name: "Nasi Goreng Cikur", price: 35 },
      { group: "Nasi Goreng", name: "Nasi Goreng Matah", price: 35, spicy: true },
      { group: "Nasi Goreng", name: "Nasi Goreng Sosis", price: 35 },
      { group: "Nasi Goreng", name: "Nasi Goreng Kampung", price: 35 },
      { group: "Nasi Goreng", name: "Nasi Goreng Daging Asap", price: 41 },
      { group: "Nasi & Lauk", name: "Nasi Ayam Goreng", price: 44 },
      { group: "Nasi & Lauk", name: "Nasi Rames Jeroan", price: 44 },
      { group: "Nasi & Lauk", name: "Nasi Sapi Teriyaki", price: 45 },
      { group: "Nasi & Lauk", name: "Nasi Chicken Teriyaki", price: 41 },
      { group: "Nasi & Lauk", name: "Nasi Tumis Sapi Rica", price: 44, spicy: true },
      { group: "Nasi & Lauk", name: "Beef Mushroom with Cream Rice", price: 54 },
      { group: "Nasi & Lauk", name: "Nasi Soto Betawi", price: 49 },
      { group: "Pasta & Mie", name: "Spaghetti Panggang", price: 42 },
      { group: "Pasta & Mie", name: "Spaghetti Tuna Aglio Olio", price: 48 },
      { group: "Pasta & Mie", name: "Spaghetti Carbonara", price: 48 },
      { group: "Pasta & Mie", name: "Indomie Mosa", price: 26, note: "Rebus / Goreng" },
    ],
  },
  {
    id: "salad",
    label: "Salad",
    tagline: "Pilihan segar dan ringan untuk menemani hari.",
    kind: "food",
    items: [
      { name: "Tuna Salad", price: 47 },
      { name: "Ceasar Salad", price: 47 },
      { name: "Thai Beef Salad", price: 54 },
    ],
    additional: {
      title: "Additional",
      description: "Tambahan untuk makanan",
      items: [
        { name: "Extra Beef", price: 28 },
        { name: "Extra Telor", price: 7 },
        { name: "Extra Nasi", price: 8 },
        { name: "Extra Kerupuk", price: 5 },
        { name: "Extra Emping", price: 10 },
      ],
    },
  },
  {
    id: "dessert",
    label: "Dessert / Sweet",
    tagline: "Penutup manis untuk melengkapi cangkir kopi Anda.",
    kind: "food",
    items: [
      { name: "Sourdough Cranberry Cheese", price: 22 },
      { name: "Cheese Cake", price: 32 },
      { name: "Banoffee", price: 32 },
      { name: "Tiramisu", price: 50 },
      { name: "Muffin Cake", price: 20 },
      { name: "American Brownies", price: 19 },
    ],
  },
];

/** Format harga ribuan -> "Rp 33.000" */
export function formatPrice(thousands: number): string {
  const value = Math.round(thousands * 1000);
  return `Rp ${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
}

/** Apakah kategori memiliki varian Hot/Cold */
export function hasTemperature(items: MenuItem[]): boolean {
  return items.some((i) => i.hot !== undefined || i.cold !== undefined);
}

/** Kelompokkan item berdasarkan `group`, mempertahankan urutan kemunculan */
export function groupItems(items: MenuItem[]): { group?: string; items: MenuItem[] }[] {
  const result: { group?: string; items: MenuItem[] }[] = [];
  for (const item of items) {
    const last = result[result.length - 1];
    if (last && last.group === item.group) {
      last.items.push(item);
    } else {
      result.push({ group: item.group, items: [item] });
    }
  }
  return result;
}

/** Total jumlah item menu (untuk statistik kecil) */
export const totalMenuItems = menuCategories.reduce(
  (sum, c) => sum + c.items.reduce((s, i) => s + (i.options ? i.options.length : 1), 0),
  0,
);
