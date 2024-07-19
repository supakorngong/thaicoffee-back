// const bcrypt = require("bcryptjs");
const prisma = require("./prisma");

// const password = bcrypt.hashSync("123456");
// const userData = [
//   { username: "andy", password, email: "andy@ggg.mail" },
//   { username: "bobby", password, email: "bobby@ggg.mail" },
//   { username: "candy", password, email: "candy@ggg.mail" },
// ];

const products = [
  {
    name: "กาเเฟดอยช้าง",
    stock: 30,
    picture:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdoichaangcoffee.co.th%2Fproduct%2Fpremium-classic%2F&psig=AOvVaw0CshIawanVzed8nvQVj7EK&ust=1718018547482000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKDcm_-zzoYDFQAAAAAdAAAAABAE",
    cost: 240,
    description: "กาแฟคั่วดอยช้างระดับค่อนข้างเข้ม (Medium to Dark) เหมาะสำหรับการชงกาแฟผ่านเครื่องเอสเพรสโซ่ สำหรับผู้ที่ต้องการความเข้มข้นของรสชาติ และบอดี้กาแฟที่สูง",
    region: "North",
    province: "เเม่ฮ่องสอน",
  },
  {
    name: "กาเเฟดอยอินทนนท์",
    stock: 30,
    picture: "https://down-th.img.susercontent.com/file/th-50009109-4cd5be6b07008b5f73b09da8d5d619d5",
    cost: 160,
    description: "เมล็ดกาแฟพันธุ์อาราบิก้าแท้ 100% จากแหล่งที่มาเดียว จึงทำให้ได้กาแฟคั่วที่มีเอกลักษณ์ของตนเอง ด้วยนิยามที่ว่า กาแฟดีต้องเข้มขำดำดั่งปีศาจ  รสชาติขมกลมกล่อม หอมบริสุทธิ์ดุจนางฟ้า",
    region: "North",
    province: "เชียงใหม่",
  },
  {
    name: "กาเเฟดอยตุง",
    stock: 30,
    picture: "https://shop.doitung.com/wp-content/uploads/2020/09/Beans_Espresso_01-scaled.jpg",
    cost: 250,
    description:
      "กาแฟอาราบิก้า 100% ปลูกใต้ร่มไม้ในป่าเขียวชอุ่มบนดอยตุง พิถีพิถันทุกขั้นตอนจากต้นจนเป็นกาแฟคั่วบดคุณภาพ คั่วโดยผู้ชำนาญการตามมาตรฐานสากล กาแฟคั่วชนิดเมล็ด เอสเพรสโซ โรสต์ ให้กลิ่นและรสชาติของกาแฟคั่วเข้มข้น",
    region: "North",
    province: "เชียงราย",
  },
  {
    name: "กาเเฟเพชรบุรี",
    stock: 30,
    picture: "https://down-th.img.susercontent.com/file/dadbc11133a65364a9c92c812c01d25d",
    cost: 200,
    description: "เมล็ดกาแฟ A5เมล็ดกาแฟคั่วระดับ เข้ม แต่ไม่เข้มจนทิ้ง เอกลักษณ์ของรสชาติ มีรสขม กลิ่นหอม เข้มข้น ไม่เปรี้ยว ",
    region: "Mid",
    province: "เพชรบุรี",
  },
  {
    name: "กาเเฟเขาทะลุ",
    stock: 30,
    picture: "https://down-th.img.susercontent.com/file/5bba8617bcbb55c32fe3459900558859",
    cost: 300,
    description:
      "กาแฟโรบัสต้าเขาทะลุ เป็นกาแฟที่ปลูกและผลิตในตำบลเขาทะลุ อำเภอสวี จังหวัดชุมพร บริเวณนี้ตั้งอยู่บนเทือกเขาตะนาวศรี มีสภาพภูมิอากาศที่เหมาะสมต่อการเพาะปลูกกาแฟเป็นอย่างมาก มีอุณหภูมิเฉลี่ยตลอดทั้งปีอยู่ที่ประมาณ 22-28 องศาเซลเซียส ปริมาณน้ำฝนเพียงพอ และดินอุดมสมบูรณ์ไปด้วยแร่ธาตุกาแฟโรบัสต้าเขาทะลุ มีรสชาติที่เข้มข้น มีบอดี้สูง มีรสขมเล็กน้อย มีกลิ่นหอมเฉพาะตัว เหมาะสำหรับผู้ที่ชื่นชอบกาแฟรสชาติเข้มและหอม",
    region: "South",
    province: "ชุมพร",
  },
  {
    name: "vCoffee",
    stock: 30,
    picture: "https://vchumphon.com/img_view/prod/45/0.3",
    cost: 200,
    description:
      "กาแฟโรบัสต้าพรีเมียม เป็นกาแฟโรบัสต้า 100% ที่ปลูก ณ พื้นที่จังหวัดชุมพร พื้นที่ที่มีการปลูกกาแฟโรบัสต้ามากสุด ผลิตด้วยกระบวนการที่ใส่ใจ ตั้งแต่กระบวนการเก็บ คัดเฉพาะผลที่มีความสมบูรณ์สุกเต็มที่ ผ่านกระบวนการสี การอบ การบ่ม การคัดเมล็ด และการคั่ว ที่ได้มาตรฐาน ทำให้กาแฟมีกลิ่นหอมและคงความเข้มของโรบัสต้า เป็นเอกลักษณ์",
    region: "South",
    province: "ชุมพร",
  },
  {
    name: "กาเเฟนายูง",
    stock: 30,
    picture: "https://down-th.img.susercontent.com/file/508a5fe8649dd9c508e01cc4e5622d45",
    cost: 350,
    description: "สายพันธุ์กาแฟโรบัสต้านายูง หนักแน่นเป็นเอกลักษณ์เฉพาะ ทำได้ทั้งกาแฟร้อนและกาแฟเย็น มีความพิเศษที่สร้างซิกเกอร์และสร้างความสนุกในการกินที่มีทั้งความเข้มและความนุ่มนวลจากแก้วเดียวกัน",
    region: "NorthEast",
    province: "อุดรธานี",
  },
  {
    name: "กาเเฟลองเลย",
    stock: 30,
    picture: "https://www.thailandpostmart.com/files/product_thumb/20220709122644.png",
    cost: 240,
    description: "กาแฟอาราบิก้าคั่วบด ไร่ลองเลย Arabica 100% คั่วกลาง หอม เข้มกับรสชาติกลมกล่อมกำลังดี สีสันที่ลงตัวกับทุกช่วงเวลา รับประทานคู่กับขนม หรือ เป็นของฝากก็เข้ากัน",
    region: "NorthEast",
    province: "เลย",
  },
];

const run = async () => {
  await prisma.product.createMany({ data: products });
};
run();
