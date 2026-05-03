const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/online-store';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  stock: Number,
  rating: Number
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const seedProducts = [
  {
    name: 'Laptop ASUS VivoBook 15',
    price: 12500000,
    description: 'Laptop ultra-tipis dengan processor Intel Core i5 generasi ke-12, RAM 8GB, SSD 512GB. Cocok untuk belajar dan bekerja dengan layar NanoEdge 15.6 inci Full HD.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    stock: 12,
    rating: 4.5
  },
  {
    name: 'Smartphone Samsung Galaxy A54',
    price: 4999000,
    description: 'Smartphone dengan layar Super AMOLED 6.4 inci, kamera 50MP, dan baterai 5000mAh. Mendukung 5G untuk koneksi internet super cepat.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
    stock: 25,
    rating: 4.3
  },
  {
    name: 'Kaos Polos Premium Cotton',
    price: 125000,
    description: 'Kaos oblong polos terbuat dari 100% katun premium, nyaman dipakai sehari-hari. Tersedia dalam berbagai ukuran dari S hingga XXL.',
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    stock: 50,
    rating: 4.7
  },
  {
    name: 'Buku Panduan Pemrograman React',
    price: 185000,
    description: 'Buku panduan lengkap belajar React dari dasar hingga mahir. Cocok untuk pemula yang ingin menjadi frontend developer profesional.',
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
    stock: 30,
    rating: 4.8
  },
  {
    name: 'Meja Belajar Minimalis',
    price: 1500000,
    description: 'Meja belajar dengan desain minimalis dan modern. Terbuat dari particle board berkualitas tinggi dengan finishing rapia. Dilengkapi laci penyimpanan.',
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400',
    stock: 8,
    rating: 4.2
  },
  {
    name: 'Sepatu Running Nike Air Max',
    price: 2599000,
    description: 'Sepatu lari dengan teknologi Air Max cushioning untuk kenyamanan maksimal. Desain sporty dan stylish cocok untuk gaya casual sehari-hari.',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    stock: 15,
    rating: 4.6
  },
  {
    name: 'Lego City Police Station',
    price: 3500000,
    description: 'Set LEGO City dengan tema Stasiun Polisi berisi 1200+ pieces. Includes 5 figur mini dan berbagai aksesoris. Cocok untuk anak usia 8+ tahun.',
    category: 'Toys',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    stock: 5,
    rating: 4.9
  },
  {
    name: 'Headphone Sony WH-1000XM5',
    price: 5999000,
    description: 'Headphone wireless dengan Active Noise Cancellation terbaik di kelasnya. Battery life hingga 30 jam dengan suara jernih dan bass yang kaya.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    stock: 10,
    rating: 4.8
  },
  {
    name: 'Jaket Hoodie Fleece',
    price: 350000,
    description: 'Jaket hoodie dengan bahan fleece lembut dan hangat. Tersedia dalam berbagai warna netral. Cocok untuk gaya casual sehari-hari.',
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
    stock: 35,
    rating: 4.4
  },
  {
    name: 'Buku Desain UI/UX Modern',
    price: 225000,
    description: 'Buku panduan desain antarmuka pengguna modern dengan studi kasus nyata. Learn Figma, prototyping, dan usability testing.',
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
    stock: 20,
    rating: 4.6
  },
  {
    name: 'Tanaman Hias Monstera',
    price: 275000,
    description: 'Tanaman hias Monstera deliciosa dalam pot ceramic elegan. Tinggi sekitar 50cm, cocok untuk dekorasi ruang tamu atau kantor.',
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400',
    stock: 18,
    rating: 4.5
  },
  {
    name: 'Dumbbell Set 20kg',
    price: 890000,
    description: 'Set dumbbell dengan total berat 20kg (2x10kg). Terbuat dari besi cor berkualitas dengan pegangan ergonomis. Cocok untuk latihan di rumah.',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400',
    stock: 12,
    rating: 4.3
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(seedProducts);
    console.log(`Successfully seeded ${seedProducts.length} products`);

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
