/* ═══════════════════════════════════════════════════
   PDS OCC — CMS Data Layer
   Stores data in localStorage, provides defaults
   ═══════════════════════════════════════════════════ */

const CMS_KEY = 'pds_occ_cms';

const DEFAULT_DATA = {
  site: {
    name: 'กลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี',
    school: 'โรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ ปทุมวัน',
    philosophy: '"ความรู้และทักษะในงาน สร้างเสริมประสบการณ์ทักษะชีวิต"',
    vision: 'เป็นแหล่งเรียนรู้วิชาการ และฝึกฝนประสบการณ์วิชาอาชีพ เพื่อส่งเสริมพัฒนาการทักษะ และแสวงหาความก้าวหน้าตามความสันทัดส่วนตน อย่างคนมีศักยภาพ',
    mission: 'ส่งเสริมทักษะชีวิต ทักษะอาชีพ เทคโนโลยีดิจิทัล และศักยภาพส่วนตนให้แก่นักเรียน',
    fb_page: 'https://www.facebook.com/pdsocc/',
    fb_api_url: 'https://pds-occ-fb-proxy-owe6.onrender.com'
  },
  slider: [
    {
      id: 1,
      title: 'กลุ่มสาระการเรียนรู้<br/><span class="accent">การงานอาชีพ</span><br/>และเทคโนโลยี',
      subtitle: 'โรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ ปทุมวัน<br/>Patumwan Demonstration School · SWU',
      eyebrow: 'Department of Career & Technology',
      bg: 'di-1',
      image: 'https://scontent.fbkk22-4.fna.fbcdn.net/v/t39.30808-6/448724555_961858312610175_6875370469297480874_n.png?stp=dst-png&cstp=mx1920x1080&ctp=s1920x1080&_nc_cat=106&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=5mguj8ZRt1wQ7kNvwEc_UFB&_nc_oc=AdruYSj-JdZuV-hssMP5Kkrb3WvL4M7tRjPeKeL2ONMXGSvjyjzjnZQk99-YdcGQFc_eSMiADtfKYHjzRMIwMRjR&_nc_zt=23&_nc_ht=scontent.fbkk22-4.fna&_nc_gid=6isX0b7W94GcX3Vezk2uAQ&_nc_ss=7b2a8&oh=00_AQAlMkWYhhcKBxv09e3Xk0a3efXIU46qIhBB-kfIXUaI1Q&oe=6A52C3DA',
      link: 'about.html',
      linkText: 'เรียนรู้เพิ่มเติม'
    },
    {
      id: 2,
      title: 'DEPARTMENT<br/>OF TECHNOLOGY',
      subtitle: 'AI · DMT · DRONE · ROBOT · ESPORTS · CODING · CG · COMSCI · D&T',
      eyebrow: '9 สาขาวิชาในกลุ่มงานคอมพิวเตอร์',
      bg: 'di-2',
      image: 'https://ptapatumwan.com/wp-content/uploads/2019/09/50697450_1849626028500049_1986810437580095488_o.jpg',
      link: 'curriculum.html',
      linkText: 'ดูหลักสูตร'
    }
  ],
  departments: [
    { id: 1, code: 'AI',      name: 'ปัญญาประดิษฐ์',          name_en: 'Artificial Intelligence', desc: 'Machine Learning, Neural Networks และการประยุกต์ใช้ AI ในชีวิตประจำวัน', desc_en: 'Machine Learning, Neural Networks, and applying AI in everyday life', bg: 'di-1', image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500&q=75&fit=crop&auto=format' },
    { id: 2, code: 'DMT',     name: 'สื่อดิจิทัล',             name_en: 'Digital Media', desc: 'Digital Media Technology การผลิตสื่อ ภาพยนตร์ และมัลติมีเดีย', desc_en: 'Digital Media Technology — media, film, and multimedia production', bg: 'di-2', image: 'https://images.unsplash.com/photo-1625690303837-654c9666d2d0?w=500&q=75&fit=crop&auto=format' },
    { id: 3, code: 'DRONE',   name: 'โดรน',                   name_en: 'Drone', desc: 'การบินโดรน UAV การถ่ายภาพทางอากาศ และการประยุกต์ใช้งาน', desc_en: 'UAV drone flight, aerial photography, and real-world applications', bg: 'di-3', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&q=75&fit=crop&auto=format' },
    { id: 4, code: 'ROBOT',   name: 'หุ่นยนต์',                name_en: 'Robotics', desc: 'Robotics การเขียนโปรแกรม Arduino และการแข่งขันหุ่นยนต์', desc_en: 'Robotics, Arduino programming, and robot competitions', bg: 'di-4', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Space_Base_Delta_1_volunteers_inspire_future_STEM_leaders_at_AFCEA_Robotics_Competition_%288866286%29.jpg/330px-Space_Base_Delta_1_volunteers_inspire_future_STEM_leaders_at_AFCEA_Robotics_Competition_%288866286%29.jpg' },
    { id: 5, code: 'ESPORTS', name: 'อีสปอร์ต',               name_en: 'E-Sports', desc: 'Electronic Sports การแข่งขันเกม และทักษะด้าน Esports อาชีพ', desc_en: 'Electronic Sports, game competition, and professional Esports skills', bg: 'di-5', image: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Arena_of_Valor_Logo_2021.png/250px-Arena_of_Valor_Logo_2021.png' },
    { id: 6, code: 'CODING',  name: 'การเขียนโปรแกรม',         name_en: 'Coding', desc: 'Web Development, App Development และ Software Engineering', desc_en: 'Web Development, App Development, and Software Engineering', bg: 'di-6', image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&q=75&fit=crop&auto=format' },
    { id: 7, code: 'CG',      name: 'คอมพิวเตอร์กราฟิก',      name_en: 'Computer Graphics', desc: 'Computer Graphics การออกแบบ 3D Animation และ VFX', desc_en: 'Computer Graphics, 3D design, animation, and VFX', bg: 'di-7', image: 'https://images.unsplash.com/photo-1547194936-28214bd75193?w=500&q=75&fit=crop&auto=format' },
    { id: 8, code: 'COMSCI',  name: 'วิทยาการคอมพิวเตอร์',    name_en: 'Computer Science', desc: 'Computer Science ฐานข้อมูล อัลกอริทึม และทฤษฎีคอมพิวเตอร์', desc_en: 'Computer Science — databases, algorithms, and computing theory', bg: 'di-8', image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&q=75&fit=crop&auto=format' },
    { id: 9, code: 'D&T',     name: 'ออกแบบและเทคโนโลยี',      name_en: 'Design & Technology', desc: 'Design & Technology งานช่าง การออกแบบผลิตภัณฑ์ และนวัตกรรม', desc_en: 'Design & Technology — craftsmanship, product design, and innovation', bg: 'di-9', image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=500&q=75&fit=crop&auto=format' }
  ],
  news: [
    { id: 1, title: 'ติดตามข่าวสารและกิจกรรมล่าสุดจากกลุ่มสาระการงานอาชีพและเทคโนโลยี', title_en: 'Follow the latest news and activities from the Career & Technology Learning Group', cat: 'Facebook · PDS OCC', cat_en: 'Facebook · PDS OCC', bg: 'ni-1', link: 'https://www.facebook.com/pdsocc/', image: 'https://images.unsplash.com/photo-1723987135977-ae935608939e?w=500&q=75&fit=crop&auto=format' },
    { id: 2, title: 'กิจกรรมส่งเสริมทักษะด้านเทคโนโลยีสารสนเทศและดิจิทัลสำหรับนักเรียน', title_en: 'Activities promoting IT and digital skills for students', cat: 'กิจกรรม · กลุ่มงานคอมพิวเตอร์', cat_en: 'Activity · Computer Group', bg: 'ni-2', link: 'https://www.facebook.com/pdsocc/', image: 'https://images.unsplash.com/photo-1531496730074-83b638c0a7ac?w=500&q=75&fit=crop&auto=format' },
    { id: 3, title: 'ข้อมูลหลักสูตรกลุ่มสาระการงานอาชีพและเทคโนโลยี ระดับชั้น ม.1–ม.6', title_en: 'Career & Technology curriculum information for Grades 7–12', cat: 'ประชาสัมพันธ์ · หลักสูตร', cat_en: 'Announcement · Curriculum', bg: 'ni-3', link: 'curriculum.html', image: 'https://images.unsplash.com/photo-1568585262983-9b54814595a9?w=500&q=75&fit=crop&auto=format' },
    { id: 4, title: 'ข่าวสารและประชาสัมพันธ์จากโรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ ปทุมวัน', title_en: 'News and announcements from Patumwan Demonstration School, SWU', cat: 'Facebook · PRPDS', cat_en: 'Facebook · PRPDS', bg: 'ni-4', link: 'https://www.facebook.com/PRPDS/', image: 'https://images.unsplash.com/photo-1613896527026-f195d5c818ed?w=500&q=75&fit=crop&auto=format' }
  ],
  activities: [
    {
      id: 1,
      title: 'ประกาศรับสมัครการแข่งขันโครงการ NEXT GEN INNOVATOR',
      title_en: 'NEXT GEN INNOVATOR Competition Registration Announcement',
      cat: 'ประกาศ · กิจกรรม',
      cat_en: 'Announcement · Activity',
      tag: 'ปีการศึกษา 2569',
      tag_en: 'Academic Year 2026',
      bg: 'ni-1',
      image: 'assets/img/next-gen-innovator.jpg',
      publishedDate: '2026-06-01',
      date: '2026-06-30',
      endDate: '2026-07-31',
      dateLabel: 'วันที่รับสมัคร - วันที่ปิดรับ',
      dateLabel_en: 'Registration period',
      location: 'รับสมัครผ่าน Google Form',
      location_en: 'Google Form registration only',
      body: '📢 ประกาศรับสมัครการแข่งขันโครงการ NEXT GEN INNOVATOR 📢\n\nในงานเปิดบ้านสาธิตปทุมวัน 2026 PDS NEXT : Next Skills for tomorrow\n\nชิงรางวัลโล่เกียรติยศ เกียรติบัตรประกาศเกียรติคุณ และทุนการศึกษารวมกว่า 20,000 บาท\n\n🔴 รับสมัครผ่าน Google Form เท่านั้น\nวันที่ 30 มิถุนายน - 31 กรกฎาคม 2569 หรือจำนวนทีมครบ 16 ทีม\n\n🔴 วันแข่งขัน\nวันที่ 9-10 สิงหาคม 2569 ณ โรงเรียนสาธิต มศว ปทุมวัน\n\n🔴 รูปแบบการแข่งขัน\n- อบรมเตรียมความพร้อมภายใต้หัวข้อนวัตกรรมสำหรับผู้สูงอายุ\n- ออกแบบพัฒนาสิ่งประดิษฐ์\n- นำเสนอผลงานในรูปแบบ Pitching\n\n📚 รายละเอียดการแข่งขัน\nสามารถอ่านเพิ่มเติมได้จาก\nhttps://drive.google.com/.../1vxHODYi.../view\n\n👩‍🎓 คุณสมบัติของผู้เข้าแข่งขัน\n- สมาชิกในทีม 2-3 คน\n- อายุ 9-12 ปี\n- กำลังศึกษาอยู่ในระดับชั้นประถมศึกษาปีที่ 4 - 6 และต้องอยู่ในโรงเรียนเดียวกันเท่านั้น',
      body_en: '📢 NEXT GEN INNOVATOR Competition Registration 📢\n\nAt the PDS Open House 2026 — PDS NEXT: Next Skills for Tomorrow\n\nCompete for trophies, certificates of honour, and scholarships totalling over 20,000 baht.\n\n🔴 Register via Google Form only\n30 June – 31 July 2026, or until 16 teams are registered\n\n🔴 Competition dates\n9–10 August 2026 at Patumwan Demonstration School, SWU\n\n🔴 Competition format\n- Training on innovations for older adults\n- Design and develop an invention\n- Present work in a pitching session\n\n📚 Full competition details\nhttps://drive.google.com/.../1vxHODYi.../view\n\n👩‍🎓 Eligibility\n- Teams of 2–3 members\n- Aged 9–12 years\n- Studying in Grades 4–6 at the same primary school',
      link: 'https://www.facebook.com/pdsocc/'
    }
  ],
  calendar: [
    { id: 1, activityId: 1, title: 'เปิดรับสมัครการแข่งขันโครงการ NEXT GEN INNOVATOR', title_en: 'NEXT GEN INNOVATOR — Registration Open', date: '2026-06-30', endDate: '2026-07-31', time: '', location: 'สมัครออนไลน์', location_en: 'Online registration', desc: 'เปิดรับสมัครการแข่งขันโครงการ NEXT GEN INNOVATOR ตั้งแต่วันที่ 30 มิถุนายน – 31 กรกฎาคม 2569', desc_en: 'NEXT GEN INNOVATOR competition registration open from 30 June – 31 July 2026', link: 'https://www.facebook.com/pdsocc/', bg: 'ni-1' },
    {
      id: 2,
      title: 'งานเปิดบ้านสาธิตปทุมวัน 2026 PDS NEXT : Next Skills for tomorrow',
      title_en: 'PDS Open House 2026 — PDS NEXT: Next Skills for Tomorrow',
      date: '2026-08-08',
      endDate: '2026-08-10',
      time: '',
      location: 'โรงเรียนสาธิตปทุมวัน',
      location_en: 'Patumwan Demonstration School',
      tag: 'ปีการศึกษา 2569',
      tag_en: 'Academic Year 2026',
      publishedDate: '2026-07-01',
      dateLabel: 'วันที่จัดงาน',
      dateLabel_en: 'Event dates',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80&fit=crop',
      body: 'โรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ ปทุมวัน จัดงานเปิดบ้านสาธิตปทุมวัน 2026 ภายใต้แนวคิด PDS NEXT : Next Skills for tomorrow เพื่อแนะแนวและเปิดโอกาสให้ผู้ปกครองและนักเรียนได้สัมผัสบรรยากาศการเรียนรู้และกิจกรรมของโรงเรียน\n\nงานจัดขึ้นระหว่างวันที่ 8 – 10 สิงหาคม 2569 ณ โรงเรียนสาธิตปทุมวัน ติดตามรายละเอียดเพิ่มเติมได้ที่ Facebook กลุ่มสาระการเรียนรู้เทคโนโลยี',
      body_en: 'Patumwan Demonstration School, SWU, hosts the 2026 Open House under the theme PDS NEXT: Next Skills for Tomorrow, giving families and students a chance to experience learning and activities at the school.\n\nThe event runs 8–10 August 2026 on campus. Follow the Technology Learning Group Facebook page for updates.',
      desc: 'งานเปิดบ้านสาธิตปทุมวัน 2026 PDS NEXT : Next Skills for tomorrow วันที่ 8 – 10 สิงหาคม 2569',
      desc_en: 'PDS Open House 2026 — PDS NEXT: Next Skills for Tomorrow, 8–10 August 2026',
      link: 'https://www.facebook.com/pdsocc/',
      bg: 'ni-1'
    }
  ],
  faculty: [
    { id: 1,  name: 'โชติวิทย์ ธรรมสุจิตร',              role: 'director', dept: 'ผู้อำนวยการโรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ ปทุมวัน', subject: '', tag: 'Director',     email: 'director@pds.ac.th', photo: 'assets/img/ผู้บริหาร -โชติวิทย์ ธรรมสุจิตร_08.png' },
    { id: 2,  name: 'นายสุนทร ภูรีปรีชาเลิศ',             role: 'deputy',   dept: 'รองผู้อำนวยการฝ่ายวิชาการวิจัย และพันธกิจสัมพันธ์เพื่อสังคม',  subject: '', tag: 'Deputy',       email: 'deputy@pds.ac.th',   photo: 'assets/img/ผู้บริหาร-อ.สุนทร ภูรีปรีชาเลิศ_02.png' },
    { id: 3,  name: 'อาจารย์ปรเมษฐ์ คำจร',               role: 'head',     dept: 'หัวหน้ากลุ่มสาระการเรียนรู้เทคโนโลยี',                          subject: '', tag: 'Head',         email: 'head@pds.ac.th',     photo: 'assets/img/การงานอาชีพ  - อ.ปรเมษฐ์ คำจร_01.png' },
    { id: 4,  name: 'อาจารย์กิตติศักดิ์ นิทาน',            role: 'teacher',  dept: 'กลุ่มงานคอมพิวเตอร์',    subject: 'วิชาเทคโนโลยีสารสนเทศ',      tag: 'Computer',     email: 'teacher@pds.ac.th',  photo: 'assets/img/ผู้บริหาร - อ.กิตติศักดิ์ นิทาน_01.png' },
    { id: 5,  name: 'อาจารย์เสกสรรค์ หงษ์หิรัญพันธ์',      role: 'teacher',  dept: 'กลุ่มงานธุรกิจ',        subject: 'วิชาการงานอาชีพ',              tag: 'Business',     email: 'teacher@pds.ac.th',  photo: 'assets/img/การงานอาชีพ - อ.เสกสรรค์ หงษ์หิรัญพันธ์_01.png' },
    { id: 6,  name: 'อาจารย์ณภัสวรรก์ สุภาแสน',           role: 'teacher',  dept: 'กลุ่มงานคหกรรม',        subject: 'วิชาการดำรงชีวิต',             tag: 'Home Ec.',     email: 'teacher@pds.ac.th',  photo: 'assets/img/การงานอาชีพ - อ.ณภัสวรรก์ สุภาแสน_01.png' },
    { id: 7,  name: 'อาจารย์กรวิชญ์ โสภา',               role: 'teacher',  dept: 'กลุ่มงานช่างและออกแบบ', subject: 'วิชางานช่างและออกแบบ',          tag: 'Design',       email: 'teacher@pds.ac.th',  photo: 'assets/img/การงานอาชีพ-อ.กรวิชญ์ โสภา_02.png' },
    { id: 8,  name: 'อาจารย์ดิเรก พรหมสาขา ณ สกลนคร',    role: 'teacher',  dept: 'กลุ่มงานคอมพิวเตอร์',    subject: 'วิชาการออกแบบและสื่อ',         tag: 'Digital Media', email: 'teacher@pds.ac.th', photo: 'assets/img/อาจารย์ ดิเรก พรหมสาขา ณ สกลนคร 01.png' },
    { id: 9,  name: 'อาจารย์ปริยากร พรสุทธิพันธุ์',         role: 'teacher',  dept: 'กลุ่มงานธุรกิจ',        subject: 'วิชาพาณิชยกรรม',               tag: 'Business',     email: 'teacher@pds.ac.th',  photo: 'assets/img/ปริยากร  พรสุทธิพันธุ์ 2.png' },
    { id: 10, name: 'อาจารย์กิตติญา กูลดี',               role: 'teacher',  dept: 'กลุ่มงานคอมพิวเตอร์',    subject: 'วิชาปัญญาประดิษฐ์และหุ่นยนต์', tag: 'AI & Robotics', email: 'teacher@pds.ac.th', photo: 'assets/img/กิตติญา-removebg-preview.png' }
  ],
  curriculum: [
    { id: 1,  grade: 1, type: 'core', code: 'ว21103', name: 'เทคโนโลยี 1', name_en: 'Technology 1',                                      teacher: 'อ.เสกสรรค์',             sem: 'เทอม 1, 2',  track: '', image: 'https://images.unsplash.com/photo-1531496730074-83b638c0a7ac?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 2,  grade: 1, type: 'elec', code: 'ว21281', name: 'หุ่นยนต์คอมพิวเตอร์ 1', name_en: 'Computer Robotics 1',                             teacher: 'อ.ปรเมษฐ์',              sem: 'เทอม 1',     track: '', image: 'https://images.unsplash.com/photo-1485827404703-89ce65a4b0d0?w=400&q=80&fit=crop', pending: false },
    { id: 3,  grade: 1, type: 'elec', code: 'ว21282', name: 'คอมพิวเตอร์กราฟิกกับการออกแบบ', name_en: 'Computer Graphics & Design',                     teacher: 'อ.ปริยากร',              sem: 'เทอม 1, 2',  track: '', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80&fit=crop', pending: false },
    { id: 4,  grade: 1, type: 'elec', code: 'ว21283', name: 'การโปรแกรมภาษาซี 1', name_en: 'C Programming 1',                                teacher: 'อ.กิตติศักดิ์',           sem: 'เทอม 1',     track: '', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80&fit=crop', pending: false },
    { id: 5,  grade: 1, type: 'elec', code: 'ว21284', name: 'การโปรแกรมภาษาซี ขั้นสูง', name_en: 'Advanced C Programming',                          teacher: 'อ.กิตติศักดิ์',           sem: 'เทอม 2',     track: '', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80&fit=crop', pending: false },
    { id: 6,  grade: 1, type: 'elec', code: 'ว21285', name: 'การโปรแกรมหุ่นยนต์', name_en: 'Robot Programming',                                teacher: 'อ.ปรเมษฐ์',              sem: 'เทอม 2',     track: '', image: 'https://images.unsplash.com/photo-1535378629746-b8f325737a72?w=400&q=80&fit=crop', pending: false },
    { id: 7,  grade: 1, type: 'elec', code: 'ว21288', name: 'การสร้างเว็บไซต์ด้วย HTML และ CSS', name_en: 'Building Websites with HTML & CSS',                  teacher: 'อ.เสกสรรค์',             sem: 'เทอม 2',     track: '', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80&fit=crop', pending: false },
    { id: 8,  grade: 1, type: 'elec', code: 'ว21289', name: 'การพัฒนาโปรแกรมภาษาไพทอน', name_en: 'Python Programming Development',                         teacher: 'อ.เสกสรรค์',             sem: 'เทอม 1, 2',  track: '', image: 'https://images.unsplash.com/photo-1516321318523-f06f85bde7a1?w=400&q=80&fit=crop', pending: false },
    { id: 9,  grade: 2, type: 'core', code: 'ว22103', name: 'เทคโนโลยี 2', name_en: 'Technology 2',                                      teacher: 'อ.ณภัสวรรก์',            sem: 'เทอม 1, 2',  track: '', image: 'https://images.unsplash.com/photo-1531496730074-83b638c0a7ac?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 12, grade: 2, type: 'elec', code: 'ว22283', name: 'หุ่นยนต์คอมพิวเตอร์ 2', name_en: 'Computer Robotics 2',                             teacher: 'อ.ปรเมษฐ์',              sem: 'เทอม 1, 2',  track: '', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 13, grade: 2, type: 'elec', code: 'ว22284', name: 'คอมพิวเตอร์กราฟิกกับการออกแบบขั้นสูง 1', name_en: 'Advanced Computer Graphics & Design 1',            teacher: 'อ.ณภัสวรรก์',            sem: 'เทอม 1',     track: '', image: 'https://images.unsplash.com/photo-1626785774573-4b9572133917?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 14, grade: 2, type: 'elec', code: 'ว22285', name: 'คอมพิวเตอร์กราฟิกกับการออกแบบขั้นสูง 2', name_en: 'Advanced Computer Graphics & Design 2',            teacher: 'อ.ณภัสวรรก์',            sem: 'เทอม 2',     track: '', image: 'https://images.unsplash.com/photo-1618005182387-a19973707a5a?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 15, grade: 2, type: 'elec', code: 'ว22291', name: 'คอมพิวเตอร์สร้างสรรค์', name_en: 'Creative Computing',                             teacher: 'อ.กรวิชญ์',              sem: 'เทอม 1',     track: '', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 16, grade: 2, type: 'elec', code: 'ว22292', name: 'วาดเส้นด้วย Procreate', name_en: 'Drawing with Procreate',                              teacher: 'อ.ปริยากร',              sem: 'เทอม 1, 2',  track: '', image: 'https://images.unsplash.com/photo-1547658718-1aa681086a87?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 17, grade: 2, type: 'elec', code: 'ว22293', name: 'นักพากย์กีฬา Esports 1', name_en: 'Esports Casting 1',                             teacher: 'อ.ดิเรก',                sem: 'เทอม 1',     track: '', image: 'https://images.unsplash.com/photo-1542756428-76ef8adf3826?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 18, grade: 2, type: 'elec', code: 'ว22294', name: 'นักพากย์กีฬา Esports ขั้นสูง 1', name_en: 'Advanced Esports Casting 1',                     teacher: 'อ.ดิเรก',                sem: 'เทอม 2',     track: '', image: 'https://images.unsplash.com/photo-151151077972-d474aa226877?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 19, grade: 2, type: 'elec', code: 'ว22xxx', name: 'การผลิตดิจิทัลสรรค์สร้างด้วย 3D Print', name_en: 'Creative Digital Production with 3D Printing',              teacher: 'อ.กิตติญา',              sem: 'เทอม 1',     track: '', image: 'https://images.unsplash.com/photo-1616765459706-15fe48728677?w=400&q=80&fit=crop&auto=format', pending: true  },
    { id: 85, grade: 3, type: 'core', code: 'ว23103', name: 'เทคโนโลยี 3', name_en: 'Technology 3',                                      teacher: 'อ.ปริยากร',              sem: 'เทอม 1, 2',  track: '', image: 'https://images.unsplash.com/photo-1531496730074-83b638c0a7ac?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 20, grade: 3, type: 'elec', code: 'ว23282', name: 'การโปรแกรมหุ่นยนต์คอมพิวเตอร์', name_en: 'Computer Robot Programming',                     teacher: 'อ.ปรเมษฐ์',              sem: 'เทอม 1',     track: '', image: 'https://images.unsplash.com/photo-1535294432514-098e64cbb5aa?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 22, grade: 3, type: 'elec', code: 'ว23284', name: 'การโปรแกรมคอมพิวเตอร์ 2', name_en: 'Computer Programming 2',                           teacher: 'อ.กิตติศักดิ์',           sem: 'เทอม 2',     track: '', image: 'https://images.unsplash.com/photo-1504384308090-c894fd59dc04?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 23, grade: 3, type: 'elec', code: 'ว23285', name: 'สร้างโครงงานด้วยหุ่นยนต์คอมพิวเตอร์', name_en: 'Building Projects with Computer Robotics',               teacher: 'อ.ปรเมษฐ์',              sem: 'เทอม 2',     track: '', image: 'https://images.unsplash.com/photo-1488220449319-7448a290ec28?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 24, grade: 3, type: 'elec', code: 'ว23286', name: 'การจัดการภาพเวกเตอร์ขั้นพื้นฐาน', name_en: 'Basic Vector Image Editing',                   teacher: 'อ.กรวิชญ์',              sem: 'เทอม 1, 2',  track: '', image: 'https://images.unsplash.com/photo-1561736778-92f803a454a3?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 25, grade: 3, type: 'elec', code: 'ว23288', name: 'สร้างสรรค์การ์ตูนดิจิทัลด้วย iPad', name_en: 'Creating Digital Cartoons with iPad',                  teacher: 'อ.ปริยากร',              sem: 'เทอม 1, 2',  track: '', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc8b0?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 26, grade: 3, type: 'elec', code: 'ว23289', name: 'การผลิตสื่อเพื่อการแข่งขัน Esports', name_en: 'Media Production for Esports Competition',                 teacher: 'อ.ดิเรก',                sem: 'เทอม 1',     track: '', image: 'https://images.unsplash.com/photo-1593305849181-a1900d4f1a24?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 27, grade: 3, type: 'elec', code: 'ว23290', name: 'กลยุทธ์ศึกษาสำหรับกีฬา Esports', name_en: 'Strategy Studies for Esports',                    teacher: 'อ.ดิเรก',                sem: 'เทอม 2',     track: '', image: 'https://images.unsplash.com/photo-1549693578-68316281e786?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 28, grade: 3, type: 'elec', code: 'ว23xxx', name: 'พื้นฐานการบินโดรน', name_en: 'Drone Flight Basics',                                  teacher: 'อ.กิตติญา',              sem: 'เทอม 1',     track: '', image: 'https://images.unsplash.com/photo-1473969609085-2ddc6bc1382c?w=400&q=80&fit=crop&auto=format', pending: true  },
    { id: 29, grade: 4, type: 'core', code: 'ว31103', name: 'เทคโนโลยี 1', name_en: 'Technology 1',                                      teacher: 'อ.กิตติศักดิ์, อ.ดิเรก, อ.กิตติญา',           sem: 'เทอม 1',     track: '', image: 'https://images.unsplash.com/photo-1531496730074-83b638c0a7ac?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 30, grade: 4, type: 'core', code: 'ว31104', name: 'เทคโนโลยี 2', name_en: 'Technology 2',                                      teacher: 'อ.กิตติศักดิ์, อ.ดิเรก, อ.กิตติญา',           sem: 'เทอม 2',     track: '', image: 'https://images.unsplash.com/photo-1531496730074-83b638c0a7ac?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 31, grade: 4, type: 'major',code: 'ว31281', name: 'การออกแบบคอนเทนต์และผลิตสื่อดิจิทัล', name_en: 'Content Design & Digital Media Production',               teacher: 'อ.กรวิชญ์',              sem: 'เทอม 1',     track: 'dmt', image: 'https://images.unsplash.com/photo-1611162617474-5b21e939e113?w=400&q=80&fit=crop', pending: false },
    { id: 32, grade: 4, type: 'major',code: 'ว31282', name: 'การโฆษณาและการประชาสัมพันธ์ในยุคดิจิทัล', name_en: 'Advertising & PR in the Digital Age',           teacher: 'อ.กรวิชญ์',              sem: 'เทอม 2',     track: 'dmt', image: 'https://images.unsplash.com/photo-1432888622747-4ebeeeff3148?w=400&q=80&fit=crop', pending: false },
    { id: 33, grade: 4, type: 'major',code: 'ว31283', name: 'การออกแบบเวกเตอร์กราฟิก', name_en: 'Vector Graphic Design',                           teacher: 'อ.ณภัสวรรก์',            sem: 'เทอม 2',     track: 'dmt', image: 'https://images.unsplash.com/photo-1626785844290-0ca0ced12973?w=400&q=80&fit=crop', pending: false },
    { id: 34, grade: 4, type: 'major',code: 'ว31287', name: 'การถ่ายภาพขั้นพื้นฐาน', name_en: 'Basic Photography',                             teacher: 'อ.ณภัสวรรก์',            sem: 'เทอม 1',     track: 'dmt', image: 'https://images.unsplash.com/photo-1452587925148-ce544eaa9bb2?w=400&q=80&fit=crop', pending: false },
    { id: 35, grade: 4, type: 'major',code: 'ว31288', name: 'การออกแบบ 3 มิติ', name_en: '3D Design',                                  teacher: 'อ.ปริยากร',              sem: 'เทอม 2',     track: 'dmt', image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=400&q=80&fit=crop', pending: false },
    { id: 36, grade: 4, type: 'major',code: 'ว31296', name: 'คอมพิวเตอร์กราฟิก', name_en: 'Computer Graphics',                                 teacher: 'อ.ปริยากร',              sem: 'เทอม 1',     track: 'dmt', image: 'https://images.unsplash.com/photo-1558651651-d921966399d2?w=400&q=80&fit=crop', pending: false },
    { id: 37, grade: 4, type: 'major',code: 'ว31286', name: 'คณิตศาสตร์และอัลกอริทึม', name_en: 'Mathematics & Algorithms',                           teacher: 'อ.ดิเรก',                sem: 'เทอม 2',     track: 'ai', image: 'https://images.unsplash.com/photo-1635073864833-66c4fc14f0b0?w=400&q=80&fit=crop', pending: false  },
    { id: 38, grade: 4, type: 'major',code: 'ว31294', name: 'พื้นฐานโปรแกรมปัญญาประดิษฐ์', name_en: 'AI Programming Basics',                       teacher: 'อ.กิตติญา',               sem: 'เทอม 2',     track: 'ai', image: 'https://images.unsplash.com/photo-1676299082847-602278843553?w=400&q=80&fit=crop', pending: false  },
    { id: 39, grade: 4, type: 'elec', code: 'ว31284', name: 'หุ่นยนต์อัตโนมัติ 1', name_en: 'Autonomous Robotics 1',                               teacher: 'อ.ปรเมษฐ์',              sem: 'เทอม 1',     track: '', image: 'https://images.unsplash.com/photo-1531746797391-fc79a00db406?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 40, grade: 4, type: 'elec', code: 'ว31285', name: 'หุ่นยนต์อัตโนมัติ 2', name_en: 'Autonomous Robotics 2',                               teacher: 'อ.ปรเมษฐ์',              sem: 'เทอม 2',     track: '', image: 'https://images.unsplash.com/photo-1555255707-c079660163b9?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 41, grade: 4, type: 'elec', code: 'ว31289', name: 'เวกเตอร์กราฟิกและการประยุกต์ใช้', name_en: 'Vector Graphics & Applications',                   teacher: 'อ.กรวิชญ์',              sem: 'เทอม 1, 2',  track: '', image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 42, grade: 4, type: 'elec', code: 'ว31290', name: 'การโปรแกรมภาษาไพทอน', name_en: 'Python Programming',                              teacher: 'อ.เสกสรรค์',             sem: 'เทอม 1',     track: '', image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed486a74?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 43, grade: 4, type: 'elec', code: 'ว31291', name: 'การประยุกต์โปรแกรมภาษาไพทอน', name_en: 'Applied Python Programming',                      teacher: 'อ.เสกสรรค์',             sem: 'เทอม 2',     track: '', image: 'https://images.unsplash.com/photo-1555949963-aa79d882981c?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 44, grade: 4, type: 'elec', code: 'ว31292', name: 'การโปรแกรมไมโครคอนโทรเลอร์พื้นฐาน 1', name_en: 'Basic Microcontroller Programming 1',              teacher: 'อ.กิตติญา',               sem: 'เทอม 1',     track: '', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 45, grade: 4, type: 'elec', code: 'ว31293', name: 'การโปรแกรมไมโครคอนโทรเลอร์พื้นฐาน 2', name_en: 'Basic Microcontroller Programming 2',              teacher: 'อ.กิตติญา',               sem: 'เทอม 2',     track: '', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3780?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 46, grade: 4, type: 'elec', code: 'ว31297', name: 'วาดสีน้ำด้วย Procreate', name_en: 'Watercolor Painting with Procreate',                             teacher: 'อ.ปริยากร',              sem: 'เทอม 2',     track: '', image: 'https://images.unsplash.com/photo-1513364777864-998663312173?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 47, grade: 4, type: 'elec', code: 'ว31298', name: 'นักพากย์กีฬา Esports 2', name_en: 'Esports Casting 2',                             teacher: 'อ.ดิเรก',                sem: 'เทอม 1',     track: '', image: 'https://images.unsplash.com/photo-1493711668977-915a8592144?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 48, grade: 4, type: 'elec', code: 'ว31299', name: 'นักพากย์กีฬา Esports ขั้นสูง 2', name_en: 'Advanced Esports Casting 2',                     teacher: 'อ.ดิเรก',                sem: 'เทอม 2',     track: '', image: 'https://images.unsplash.com/photo-1611162616305-c69b3037a141?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 49, grade: 5, type: 'core', code: 'ว32281', name: 'เทคโนโลยี 3', name_en: 'Technology 3',                                      teacher: 'อ.กรวิชญ์',              sem: 'เทอม 1, 2',  track: '', image: 'https://images.unsplash.com/photo-1531496730074-83b638c0a7ac?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 50, grade: 5, type: 'major',code: 'ว32290', name: 'การสร้างโมชั่นกราฟิก', name_en: 'Creating Motion Graphics',                              teacher: 'อ.ปริยากร',              sem: 'เทอม 1',     track: 'dmt', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80&fit=crop', pending: false },
    { id: 51, grade: 5, type: 'major',code: 'ว32291', name: 'การผลิตภาพยนตร์', name_en: 'Film Production',                                   teacher: 'อ.ณภัสวรรก์',            sem: 'เทอม 1',     track: 'dmt', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&q=80&fit=crop', pending: false },
    { id: 52, grade: 5, type: 'major',code: 'ว32292', name: 'การออกแบบสื่อดิจิทัล', name_en: 'Digital Media Design',                              teacher: 'อ.ณภัสวรรก์',            sem: 'เทอม 2',     track: 'dmt', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80&fit=crop', pending: false },
    { id: 53, grade: 5, type: 'major',code: 'ว32293', name: 'การถ่ายภาพขั้นสูง', name_en: 'Advanced Photography',                                 teacher: 'อ.ปริยากร',              sem: 'เทอม 2',     track: 'dmt', image: 'https://images.unsplash.com/photo-1509228621472-083546a3d3b6?w=400&q=80&fit=crop', pending: false },
    { id: 54, grade: 5, type: 'major',code: 'ว32282', name: 'ศิลปะการถ่ายภาพเคลื่อนไหว', name_en: 'The Art of Motion Photography',                        teacher: 'อ.กรวิชญ์',              sem: 'เทอม 1',     track: 'dmt', image: 'https://images.unsplash.com/photo-1555252337-4f871543e4e7?w=400&q=80&fit=crop', pending: true  },
    { id: 55, grade: 5, type: 'major',code: 'ว322xx', name: 'การเล่าเรื่องในสื่อดิจิทัล', name_en: 'Storytelling in Digital Media',                         teacher: 'อ.กรวิชญ์',              sem: 'เทอม 2',     track: 'dmt', image: 'https://images.unsplash.com/photo-1485827790217-2fe3772a4e6d?w=400&q=80&fit=crop', pending: true  },
    { id: 56, grade: 5, type: 'major',code: 'ว32294', name: 'คณิตศาสตร์สำหรับคอมพิวเตอร์', name_en: 'Mathematics for Computing',                       teacher: 'อ.ดิเรก',                sem: 'เทอม 1',     track: 'ai', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80&fit=crop', pending: false },
    { id: 57, grade: 5, type: 'major',code: 'ว32295', name: 'การโปรแกรมและปัญญาประดิษฐ์', name_en: 'Programming & Artificial Intelligence',                        teacher: 'อ.กิตติญา',               sem: 'เทอม 2',     track: 'ai', image: 'https://images.unsplash.com/photo-1517433456452-88d67391b0d8?w=400&q=80&fit=crop', pending: false },
    { id: 58, grade: 5, type: 'major',code: 'ว32283', name: 'การโปรแกรมและปัญญาประดิษฐ์', name_en: 'Programming & Artificial Intelligence',                        teacher: 'อ.กิตติญา',              sem: 'เทอม 1',     track: 'ai', image: 'https://images.unsplash.com/photo-1474511320724-a57bc2782c62?w=400&q=80&fit=crop', pending: true  },
    { id: 59, grade: 5, type: 'major',code: 'ว322xx', name: 'อินเทอร์เน็ตสำหรับทุกสรรพสิ่ง', name_en: 'Internet of Things',                     teacher: 'อ.ปรเมษฐ์',              sem: 'เทอม 2',     track: 'ai', image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80&fit=crop', pending: true  },
    { id: 60, grade: 5, type: 'major',code: 'ว32284', name: 'การออกแบบดิจิทัล', name_en: 'Digital Design',                                  teacher: 'อ.ดิเรก',                sem: 'เทอม 1',     track: 'ai', image: 'https://images.unsplash.com/photo-1574267432553-4d0a4512a692?w=400&q=80&fit=crop', pending: true  },
    { id: 61, grade: 5, type: 'major',code: 'ว322xx', name: 'การเขียนโปรแกรมเว็บพื้นฐาน', name_en: 'Basic Web Programming',                        teacher: 'อ.กิตติศักดิ์',           sem: 'เทอม 2',     track: 'ai', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed3?w=400&q=80&fit=crop', pending: true  },
    { id: 62, grade: 5, type: 'elec', code: 'ว32285', name: 'คอมพิวเตอร์กับการจัดกิจกรรม', name_en: 'Computers for Event Management',                       teacher: 'อ.ณภัสวรรก์',            sem: 'เทอม 1, 2',  track: '', image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 63, grade: 5, type: 'elec', code: 'ว32286', name: 'การตัดต่อภาพยนตร์', name_en: 'Film Editing',                                 teacher: 'อ.กรวิชญ์',              sem: 'เทอม 1, 2',  track: '', image: 'https://images.unsplash.com/photo-1581092162388-6187c386aa3a?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 64, grade: 5, type: 'elec', code: 'ว32287', name: 'การออกแบบสิ่งพิมพ์ในงานธุรกิจ', name_en: 'Print Design for Business',                     teacher: 'อ.กรวิชญ์',              sem: 'เทอม 1, 2',  track: '', image: 'https://images.unsplash.com/photo-1492691527719-9d998e27b4ae?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 65, grade: 5, type: 'elec', code: 'ว32288', name: 'สร้างผลงานด้วย Procreate', name_en: 'Creating Work with Procreate',                           teacher: 'อ.ปริยากร',              sem: 'เทอม 1, 2',  track: '', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 66, grade: 5, type: 'elec', code: 'ว32289', name: 'คอมพิวเตอร์กราฟิกสำหรับ Esports', name_en: 'Computer Graphics for Esports',                   teacher: 'อ.ดิเรก',                sem: 'เทอม 1, 2',  track: '', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 67, grade: 5, type: 'elec', code: 'ว32296', name: 'กล่องสมองกลเพื่องานควบคุมและ IoT', name_en: 'Microcontrollers for Control & IoT',                   teacher: 'อ.ปรเมษฐ์',              sem: 'เทอม 1, 2',  track: '', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 69, grade: 5, type: 'elec', code: 'ว32298', name: 'การบินโดรนขั้นสูง', name_en: 'Advanced Drone Flight',                                  teacher: 'อ.อภิรัฐ',               sem: 'เทอม 2',     track: '', image: 'https://images.unsplash.com/photo-1451187580459-4340e9bb9008?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 70, grade: 6, type: 'core', code: 'ว33281', name: 'เทคโนโลยี 4', name_en: 'Technology 4',                                      teacher: 'อ.เสกสรรค์',              sem: 'เทอม 1, 2',  track: '', image: 'https://images.unsplash.com/photo-1531496730074-83b638c0a7ac?w=400&q=80&fit=crop&auto=format', pending: false },
    { id: 71, grade: 6, type: 'major',code: 'ว33285', name: 'โครงงานดิจิทัลมีเดีย', name_en: 'Digital Media Project',                              teacher: 'อ.ณภัสวรรก์, อ.ปริยากร', sem: 'เทอม 1',     track: 'dmt', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33bb?w=400&q=80&fit=crop', pending: false },
    { id: 72, grade: 6, type: 'major',code: 'ว33286', name: 'บูรณาการทักษะดิจิทัลมีเดีย', name_en: 'Integrated Digital Media Skills',                        teacher: 'อ.ณภัสวรรก์, อ.ปริยากร', sem: 'เทอม 2',     track: 'dmt', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80&fit=crop', pending: false },
    { id: 73, grade: 6, type: 'major',code: 'ว33289', name: 'การคิดเชิงสร้างสรรค์และการออกแบบสื่อดิจิทัล', name_en: 'Creative Thinking & Digital Media Design',       teacher: 'อ.กรวิชญ์',              sem: 'เทอม 1',     track: 'dmt', image: 'https://images.unsplash.com/photo-1531482615710-758afd94a285?w=400&q=80&fit=crop', pending: true  },
    { id: 74, grade: 6, type: 'major',code: 'ว33290', name: 'การพัฒนาบุคลิกภาพนักนิเทศศาสตร์ในยุคดิจิทัล', name_en: 'Personality Development for Digital Communicators',      teacher: 'อ.กรวิชญ์',              sem: 'เทอม 2',     track: 'dmt', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80&fit=crop', pending: true  },
    { id: 75, grade: 6, type: 'major',code: 'ว33287', name: 'อินเทอร์เน็ตสำหรับทุกสรรพสิ่ง', name_en: 'Internet of Things',                     teacher: 'อ.ปรเมษฐ์',              sem: 'เทอม 1',     track: 'ai', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80&fit=crop', pending: false },
    { id: 76, grade: 6, type: 'major',code: 'ว33288', name: 'โครงงานวิศวกรรมปัญญาประดิษฐ์', name_en: 'AI Engineering Project',                      teacher: 'อ.กิตติศักดิ์',           sem: 'เทอม 2',     track: 'ai', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&q=80&fit=crop', pending: false },
    { id: 77, grade: 6, type: 'major',code: 'ว33291', name: 'โครงงานวิศวกรรมปัญญาประดิษฐ์ 1', name_en: 'AI Engineering Project 1',                    teacher: 'อ.ปรเมษฐ์',              sem: 'เทอม 1',     track: 'ai', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80&fit=crop', pending: true  },
    { id: 78, grade: 6, type: 'major',code: 'ว33292', name: 'การจัดการระบบฐานข้อมูล', name_en: 'Database System Management',                            teacher: 'อ.กิตติศักดิ์',           sem: 'เทอม 2',     track: 'ai', image: 'https://images.unsplash.com/photo-1556760547-74068506f1d1?w=400&q=80&fit=crop', pending: true  },
    { id: 79, grade: 6, type: 'major',code: 'ว33293', name: 'โครงงานวิศวกรรมปัญญาประดิษฐ์ 2', name_en: 'AI Engineering Project 2',                    teacher: 'อ.ปรเมษฐ์',              sem: 'เทอม 1',     track: 'ai', image: 'https://images.unsplash.com/photo-1553877522-c69a3fa25636?w=400&q=80&fit=crop', pending: true  },
    { id: 80, grade: 6, type: 'major',code: 'ว33294', name: 'อากาศยานไร้คนขับ', name_en: 'Unmanned Aerial Vehicles',                                  teacher: 'อ.กิตติญา',              sem: 'เทอม 2',     track: 'ai', image: 'https://images.unsplash.com/photo-1516321497487-2881701099a0?w=400&q=80&fit=crop', pending: true  }
  ],
  resources: [
    { id: 1,  name: 'Teachable Machine', desc: 'สอน AI ให้จำแนกภาพ เสียง และท่าทาง โดย Google ไม่ต้องเขียนโค้ด',                      desc_en: 'Train AI to recognize images, sounds, and poses by Google — no coding required', url: 'https://teachablemachine.withgoogle.com', cat: 'ai',    logo: 'https://cdn.simpleicons.org/google/4285F4',         bg: 'linear-gradient(135deg,#e8f4fd,#d0e8ff)' },
    { id: 2,  name: 'ML for Kids',        desc: 'เรียน Machine Learning ผ่านโปรเจกต์สนุก ๆ เหมาะสำหรับเด็กและเยาวชน',                  desc_en: 'Learn Machine Learning through fun projects, ideal for kids and youth', url: 'https://machinelearningforkids.co.uk',   cat: 'ai',    logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://machinelearningforkids.co.uk&size=256', bg: 'linear-gradient(135deg,#e8eeff,#d0daff)' },
    { id: 3,  name: 'Kaggle',             desc: 'แพลตฟอร์ม Data Science และ AI พร้อม dataset ฟรีและการแข่งขัน',                         desc_en: 'A Data Science and AI platform with free datasets and competitions', url: 'https://www.kaggle.com',                  cat: 'ai',    logo: 'https://cdn.simpleicons.org/kaggle/20BEFF',         bg: 'linear-gradient(135deg,#e0f6ff,#c0eaff)' },
    { id: 4,  name: 'Hugging Face',       desc: 'คลัง AI model และ dataset ที่ใหญ่ที่สุดในโลก พร้อม Spaces ทดสอบฟรี',                  desc_en: 'The world\'s largest hub of AI models and datasets, with free Spaces to try', url: 'https://huggingface.co',                  cat: 'ai',    logo: 'https://cdn.simpleicons.org/huggingface/FFD21E',    bg: 'linear-gradient(135deg,#fffbe8,#fff3c0)' },
    { id: 5,  name: 'Arduino',            desc: 'แหล่งความรู้ไมโครคอนโทรลเลอร์ Arduino ทั้ง tutorial และ project',                      desc_en: 'Arduino microcontroller resources with tutorials and projects', url: 'https://www.arduino.cc',                  cat: 'robot', logo: 'https://cdn.simpleicons.org/arduino/00979D',       bg: 'linear-gradient(135deg,#e0f5f3,#b8ede8)' },
    { id: 6,  name: 'Tinkercad',          desc: 'ออกแบบ 3D จำลองวงจรไฟฟ้า และเขียนโค้ดบนเบราว์เซอร์ฟรี โดย Autodesk',                    desc_en: 'Design 3D models, simulate circuits, and code in your browser — free from Autodesk', url: 'https://www.tinkercad.com',               cat: 'robot', logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.tinkercad.com&size=256',      bg: 'linear-gradient(135deg,#e8f4ff,#cce4ff)' },
    { id: 7,  name: 'VEX VR',             desc: 'เขียนโปรแกรมควบคุมหุ่นยนต์ใน VR environment แบบ block-based และ Python',               desc_en: 'Program robots in a VR environment with block-based coding and Python', url: 'https://education.vex.com/vexvr',         cat: 'robot', logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://vexrobotics.com&size=256', bg: 'linear-gradient(135deg,#fff0f0,#ffd8d8)' },
    { id: 8,  name: 'DroneBlocks',        desc: 'เขียนโปรแกรมควบคุมโดรนด้วยบล็อก เหมาะสำหรับการเรียนรู้การบินอัตโนมัติ',              desc_en: 'Program drones with blocks, great for learning autonomous flight', url: 'https://droneblocks.io',                  cat: 'drone', logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://droneblocks.io&size=256', bg: 'linear-gradient(135deg,#e8f0ff,#d0deff)' },
    { id: 9,  name: 'DJI Education',      desc: 'แหล่งเรียนรู้การบินโดรนและการเขียนโปรแกรมจาก DJI ผู้ผลิตโดรนชั้นนำ',                 desc_en: 'Drone flight and programming resources from DJI, a leading drone maker', url: 'https://www.dji.com/education',           cat: 'drone', logo: 'https://cdn.simpleicons.org/dji/242424',           bg: 'linear-gradient(135deg,#f0f0f0,#e0e0ea)' },
    { id: 10, name: 'Blender',            desc: 'โปรแกรม 3D ฟรีระดับโลก พร้อม tutorial จากชุมชนขนาดใหญ่',                              desc_en: 'World-class free 3D software with tutorials from a huge community', url: 'https://www.blender.org',                 cat: 'cg',    logo: 'https://cdn.simpleicons.org/blender/E87D0D',        bg: 'linear-gradient(135deg,#fff3e0,#ffe0b0)' },
    { id: 11, name: 'Figma',              desc: 'ออกแบบ UI/UX และกราฟิกดิจิทัลบนเบราว์เซอร์ ฟรีสำหรับนักเรียน',                       desc_en: 'Design UI/UX and digital graphics in your browser, free for students', url: 'https://www.figma.com',                   cat: 'cg',    logo: 'https://cdn.simpleicons.org/figma/F24E1E',          bg: 'linear-gradient(135deg,#fff0ec,#ffd8d0)' },
    { id: 12, name: 'Canva',              desc: 'ออกแบบสื่อกราฟิก โปสเตอร์ และ presentation ได้ง่ายโดยไม่ต้องมีพื้นฐาน',              desc_en: 'Easily design graphics, posters, and presentations with no experience needed', url: 'https://www.canva.com',                   cat: 'cg',    logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.canva.com&size=256',          bg: 'linear-gradient(135deg,#e0fafa,#c0f0f0)' },
    { id: 13, name: 'Freepik',            desc: 'คลัง vector กราฟิก ไอคอน และ template ฟรีสำหรับงานออกแบบ',                            desc_en: 'A library of free vectors, icons, and templates for design work', url: 'https://www.freepik.com',                 cat: 'cg',    logo: 'https://cdn.simpleicons.org/freepik/1273EB',        bg: 'linear-gradient(135deg,#e8f0ff,#ccdeff)' },
    { id: 14, name: 'Kapwing',            desc: 'ตัดต่อวิดีโอและสร้างสื่อดิจิทัลบนเบราว์เซอร์ เหมาะสำหรับงาน digital media',          desc_en: 'Edit video and create digital media in your browser, ideal for digital media work', url: 'https://www.kapwing.com',                 cat: 'dmt',   logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://kapwing.com&size=256', bg: 'linear-gradient(135deg,#e8ffe8,#d0f0d0)' },
    { id: 15, name: 'Adobe Express',      desc: 'สร้างกราฟิก วิดีโอ และสื่อโซเชียลฟรีจาก Adobe',                                       desc_en: 'Create graphics, video, and social media for free from Adobe', url: 'https://www.adobe.com/express',           cat: 'dmt',   logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.adobe.com/express&size=256',          bg: 'linear-gradient(135deg,#fff0f0,#ffd8d8)' },
    { id: 16, name: 'Scratch',            desc: 'เขียนโปรแกรมด้วยบล็อกภาพ สร้างเกม แอนิเมชัน และเรื่องราวเชิงโต้ตอบ',                desc_en: 'Code with visual blocks to build games, animations, and interactive stories', url: 'https://scratch.mit.edu',                 cat: 'code',  logo: 'https://cdn.simpleicons.org/scratch/4D97E8',        bg: 'linear-gradient(135deg,#e8f4ff,#ccddff)' },
    { id: 17, name: 'Code.org',           desc: 'เรียนเขียนโปรแกรมสำหรับทุกวัย พร้อม Hour of Code และ course ฟรีหลายระดับ',            desc_en: 'Learn to code for all ages, with Hour of Code and free courses at every level', url: 'https://code.org',                        cat: 'code',  logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://code.org&size=256', bg: 'linear-gradient(135deg,#fff0f5,#ffd8e8)' },
    { id: 18, name: 'freeCodeCamp',       desc: 'หลักสูตร Web Development ฟรี 3,000+ ชั่วโมง พร้อม certificate',                        desc_en: 'A free Web Development curriculum with 3,000+ hours and certificates', url: 'https://www.freecodecamp.org',            cat: 'code',  logo: 'https://cdn.simpleicons.org/freecodecamp/0A0A23',   bg: 'linear-gradient(135deg,#f0f0f8,#e0e0f0)' },
    { id: 19, name: 'Replit',             desc: 'เขียนและรันโค้ดบนเบราว์เซอร์ รองรับ 50+ ภาษา ใช้ได้ทันทีไม่ต้องติดตั้ง',            desc_en: 'Write and run code in your browser — 50+ languages, instant with no install', url: 'https://replit.com',                      cat: 'code',  logo: 'https://cdn.simpleicons.org/replit/F26207',         bg: 'linear-gradient(135deg,#fff3e8,#ffddb8)' },
    { id: 20, name: 'p5.js',              desc: 'เขียนโค้ด JavaScript สร้างงาน Interactive art และ visual สุดสร้างสรรค์',               desc_en: 'Write JavaScript to create interactive art and creative visuals', url: 'https://p5js.org',                        cat: 'code',  logo: 'https://cdn.simpleicons.org/p5dotjs/ED225D',        bg: 'linear-gradient(135deg,#fff0f3,#ffd0d8)' },

    /* ── หนังสือ (Books) ── */
    { id: 21, type: 'book', name: 'Automate the Boring Stuff', desc: 'หนังสือสอนเขียน Python ฟรี เน้นงานอัตโนมัติในชีวิตจริง', desc_en: 'Free Python book focused on automating real-life tasks', url: 'https://automatetheboringstuff.com', cat: 'code', logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://automatetheboringstuff.com&size=256', bg: 'linear-gradient(135deg,#eef0ff,#dde2ff)' },
    { id: 22, type: 'book', name: 'Eloquent JavaScript', desc: 'หนังสือ JavaScript ออนไลน์ฟรี อ่านได้ทั้งเล่มพร้อมตัวอย่างโต้ตอบ', desc_en: 'A free online JavaScript book with interactive examples', url: 'https://eloquentjavascript.net', cat: 'code', logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://eloquentjavascript.net&size=256', bg: 'linear-gradient(135deg,#fff7e6,#ffeec2)' },
    { id: 23, type: 'book', name: 'Think Python', desc: 'หนังสือพื้นฐานการเขียนโปรแกรมและวิทยาการคอมพิวเตอร์ด้วย Python', desc_en: 'An introduction to programming and computer science with Python', url: 'https://greenteapress.com/wp/think-python-2e/', cat: 'code', logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://greenteapress.com&size=256', bg: 'linear-gradient(135deg,#e9f7ee,#cdebd8)' },
    { id: 24, type: 'book', name: 'Dive into Deep Learning', desc: 'ตำราเรียน Deep Learning ฟรี พร้อมโค้ดและคณิตศาสตร์ครบถ้วน', desc_en: 'A free interactive deep-learning textbook with code and math', url: 'https://d2l.ai', cat: 'ai', logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://d2l.ai&size=256', bg: 'linear-gradient(135deg,#eef0ff,#d7ddff)' },

    /* ── วารสาร (Journals / Magazines) ── */
    { id: 25, type: 'journal', name: 'IEEE Spectrum', desc: 'นิตยสารวิชาการด้านเทคโนโลยีและวิศวกรรมจาก IEEE', desc_en: 'IEEE technology and engineering magazine', url: 'https://spectrum.ieee.org', cat: 'ai', logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://spectrum.ieee.org&size=256', bg: 'linear-gradient(135deg,#e8eefc,#cdd9f6)' },
    { id: 26, type: 'journal', name: 'MIT Technology Review', desc: 'วารสารข่าวและบทวิเคราะห์เทคโนโลยีจาก MIT', desc_en: 'Technology news and analysis from MIT', url: 'https://www.technologyreview.com', cat: 'ai', logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.technologyreview.com&size=256', bg: 'linear-gradient(135deg,#fdeef0,#f7d6dc)' },
    { id: 27, type: 'journal', name: 'Communications of the ACM', desc: 'วารสารวิชาการด้านวิทยาการคอมพิวเตอร์ชั้นนำของโลก', desc_en: 'A leading computer-science academic magazine', url: 'https://cacm.acm.org', cat: 'code', logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://cacm.acm.org&size=256', bg: 'linear-gradient(135deg,#eef0f6,#dce0ee)' },
    { id: 28, type: 'journal', name: 'ThaiJO', desc: 'ฐานข้อมูลวารสารวิชาการไทยออนไลน์ (Thai Journals Online)', desc_en: 'Thai Journals Online academic database', url: 'https://www.tci-thaijo.org', cat: 'code', logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.tci-thaijo.org&size=256', bg: 'linear-gradient(135deg,#e9f7ee,#cdebd8)' },

    /* ── งานวิจัย (Research) ── */
    { id: 29, type: 'research', name: 'Google Scholar', desc: 'ค้นหางานวิจัยและบทความวิชาการทุกสาขาทั่วโลก', desc_en: 'Search scholarly research and academic articles worldwide', url: 'https://scholar.google.com', cat: 'ai', logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://scholar.google.com&size=256', bg: 'linear-gradient(135deg,#e8f0fd,#cfe0fb)' },
    { id: 30, type: 'research', name: 'arXiv', desc: 'คลังงานวิจัยพรีปรินต์ด้าน AI วิทยาการคอมพิวเตอร์ และวิทยาศาสตร์', desc_en: 'Open preprint archive for AI, CS, and science research', url: 'https://arxiv.org/list/cs.AI/recent', cat: 'ai', logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://arxiv.org&size=256', bg: 'linear-gradient(135deg,#fdeef0,#f7d6dc)' },
    { id: 31, type: 'research', name: 'Papers with Code', desc: 'งานวิจัย AI พร้อมโค้ดและผลทดลองที่ทำซ้ำได้', desc_en: 'AI research papers paired with reproducible code', url: 'https://paperswithcode.com', cat: 'ai', logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://paperswithcode.com&size=256', bg: 'linear-gradient(135deg,#eef7f0,#d6ecdd)' },
    { id: 32, type: 'research', name: 'Semantic Scholar', desc: 'เครื่องมือค้นงานวิจัยด้วย AI ช่วยสรุปและเชื่อมโยงอ้างอิง', desc_en: 'AI-powered research search with summaries and citation links', url: 'https://www.semanticscholar.org', cat: 'ai', logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.semanticscholar.org&size=256', bg: 'linear-gradient(135deg,#eef0ff,#d7ddff)' },

    { id: 33, name: 'Wokwi',              desc: 'จำลองวงจร Arduino ESP32 และ Raspberry Pi Pico บนเบราว์เซอร์ แก้ไขและรันโค้ดได้ทันที', desc_en: 'Simulate Arduino, ESP32, and Raspberry Pi Pico circuits in your browser', url: 'https://wokwi.com', cat: 'robot', logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://wokwi.com&size=256', bg: 'linear-gradient(135deg,#eef7ff,#d4ebff)' },
    { id: 34, name: 'MakeCode micro:bit', desc: 'เขียนโปรแกรม micro:bit ด้วยบล็อกหรือ JavaScript จาก Microsoft ใช้งานฟรีบนเว็บ',    desc_en: 'Program the micro:bit with blocks or JavaScript — free from Microsoft', url: 'https://makecode.microbit.org', cat: 'robot', logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://makecode.microbit.org&size=256', bg: 'linear-gradient(135deg,#fff4e8,#ffe4c8)' },
    { id: 35, name: 'W3Schools',          desc: 'เรียน HTML CSS JavaScript Python และภาษาโปรแกรมมิงออนไลน์ฟรี พร้อมตัวอย่างและแบบฝึกหัด', desc_en: 'Free tutorials and exercises for HTML, CSS, JavaScript, Python, and more', url: 'https://www.w3schools.com', cat: 'code', logo: 'https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.w3schools.com&size=256', bg: 'linear-gradient(135deg,#e8fff0,#cef5dc)' }
  ],
  about: {
    phil_badge: 'ปรัชญา · Philosophy',
    phil_badge_en: 'Philosophy',
    phil_text: '<em>ความรู้และทักษะในงาน</em> สร้างเสริมประสบการณ์<em>ทักษะชีวิต</em>',
    phil_text_en: '<em>Knowledge and skills in work</em> build and enrich <em>life experience</em>',
    phil_sub:  'กลุ่มสาระเทคโนโลยีเชื่อมั่นว่า การเรียนรู้ที่มีคุณภาพต้องเชื่อมโยงทั้งความรู้เชิงวิชาการ และประสบการณ์จริง เพื่อสร้างผู้เรียนที่มีทักษะพร้อมสำหรับโลกยุคใหม่',
    phil_sub_en: 'The Technology Learning Group believes that quality learning must connect academic knowledge with real experience, creating learners who are ready for the modern world.',
    vision_text: 'เป็นแหล่งเรียนรู้วิชาการ และฝึกฝนประสบการณ์วิชาอาชีพ เพื่อส่งเสริมพัฒนาการทักษะ และแสวงหาความก้าวหน้าตามความสันทัดส่วนตน อย่างคนมีศักยภาพ',
    vision_text_en: 'A centre for academic learning and vocational experience that develops skills and helps each person advance according to their aptitude and potential.',
    mc1_title: 'ส่งเสริมทักษะชีวิต',
    mc1_title_en: 'Life Skills',
    mc1_text:  'พัฒนาทักษะที่จำเป็นสำหรับการดำรงชีวิตในโลกยุคใหม่อย่างมีประสิทธิภาพ',
    mc1_text_en: 'Develop essential skills for living effectively in the modern world.',
    mc2_title: 'พัฒนาทักษะอาชีพ',
    mc2_title_en: 'Career Skills',
    mc2_text:  'เสริมสร้างความรู้และทักษะด้านการประกอบอาชีพในสาขาที่หลากหลาย',
    mc2_text_en: 'Build knowledge and vocational skills across diverse fields.',
    mc3_title: 'เทคโนโลยีดิจิทัล',
    mc3_title_en: 'Digital Technology',
    mc3_text:  'ฝึกทักษะด้านเทคโนโลยีสารสนเทศและดิจิทัล เพื่อรับมือโลกอนาคต',
    mc3_text_en: 'Train IT and digital skills to meet the challenges of the future.',
    mc4_title: 'เสริมสร้างศักยภาพ',
    mc4_title_en: 'Personal Potential',
    mc4_text:  'พัฒนาผู้เรียนให้มีศักยภาพและค้นพบความถนัดตามความสนใจส่วนตน',
    mc4_text_en: 'Develop learners with potential who discover their strengths and interests.'
  },
  heroes: {
    about:      { image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&q=80' },
    curriculum: { image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80' },
    resources:  { image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600&q=80' },
    news:       { image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80' },
    contact:    { image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80' }
  },
  contact: {
    fb_url: 'https://www.facebook.com/pdsocc/',
    maps_url: 'https://maps.google.com/?q=Patumwan+Demonstration+School+SWU+Bangkok',
    web_url: '',
    phone: '',
    email: '',
    emailjs_public_key: '',
    emailjs_service_id: '',
    emailjs_template_id: ''
  },
  labels: { th: {}, en: {} },
  mourning: {
    enabled:    true,
    grayscale:  false,
    showRibbon: true,
    showModal:  false,
    modalOnce:  true,
    mode:       'mourning',
    title:      'สถิตในใจปวงชนตราบนิรันดร์',
    title_en:   'Forever in Our Hearts',
    subtitle:   '',
    subtitle_en: '',
    body:       'ด้วยรัก ความอาลัย และความสำนึกในพระมหากรุณาธิคุณ\n\nขอแสดงความอาลัยอย่างสุดซึ้ง และน้อมรำลึกในพระกรุณาธิคุณเป็นล้นพ้น',
    body_en:    '',
    footer:     'ผู้บริหาร คณะครู บุคลากร นักเรียน และผู้ปกครอง\nกลุ่มสาระการเรียนรู้การงานอาชีพและเทคโนโลยี\nโรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ ปทุมวัน',
    footer_en:  '',
    image:      '',
    link:       '',
    linkText:   'อ่านเพิ่มเติม',
    linkText_en: 'Read more'
  }
};

/* ── Deep merge: saved data over defaults ──────────────
   - plain objects merge key-by-key (so new default keys appear
     even when an older saved object is missing them)
   - arrays use the saved value only when it's a non-empty array,
     otherwise fall back to the default (so empty/stale saved
     arrays never blank out the page)
   - everything else: saved value wins                          */
function deepMerge(def, saved) {
  if (Array.isArray(def)) {
    return (Array.isArray(saved) && saved.length) ? saved : def;
  }
  if (def && typeof def === 'object') {
    const out = { ...def };
    if (saved && typeof saved === 'object') {
      for (const key of Object.keys(saved)) {
        out[key] = (key in def) ? deepMerge(def[key], saved[key]) : saved[key];
      }
    }
    return out;
  }
  return saved !== undefined ? saved : def;
}

/* ── Backfill English (_en) fields onto saved items ────
   Older localStorage data was saved before the bilingual
   fields existed; deepMerge keeps the saved array as-is, so we
   copy any missing *_en value from the matching default (by id).
   Only fills blanks — never overwrites edits the user made.     */
function backfillEN(arr, defArr, fields) {
  if (!Array.isArray(arr) || !Array.isArray(defArr)) return arr;
  const byId = {};
  defArr.forEach(d => { byId[d.id] = d; });
  arr.forEach(item => {
    const def = byId[item.id];
    if (!def) return;
    fields.forEach(f => {
      if ((item[f] === undefined || item[f] === '') && def[f] !== undefined && def[f] !== '') {
        item[f] = def[f];
      }
    });
  });
  return arr;
}

/* Sync logos/types from defaults and append newly added resource entries */
function backfillResources(arr, defArr) {
  if (!Array.isArray(defArr)) return arr || [];
  const list = Array.isArray(arr) && arr.length ? arr.slice() : [];
  const byId = {};
  defArr.forEach(d => { byId[d.id] = d; });
  list.forEach(item => {
    const def = byId[item.id];
    if (!def) return;
    if (def.logo) item.logo = def.logo;
    if (def.type && !item.type) item.type = def.type;
  });
  const ids = new Set(list.map(r => r.id));
  defArr.forEach(d => {
    if (!ids.has(d.id)) list.push(JSON.parse(JSON.stringify(d)));
  });
  return list;
}

function backfillCalendar(arr, defArr) {
  if (!Array.isArray(defArr)) return arr || [];
  const defById = {};
  defArr.forEach(d => { defById[d.id] = d; });
  const list = Array.isArray(arr) && arr.length ? arr.slice() : [];
  const ids = new Set(list.map(c => c.id));
  list.forEach(item => {
    const def = defById[item.id];
    if (!def) return;
    ['activityId', 'date', 'endDate', 'time', 'location', 'location_en', 'tag', 'tag_en',
     'publishedDate', 'dateLabel', 'dateLabel_en', 'image', 'body', 'body_en', 'bg', 'link',
     'title', 'title_en', 'desc', 'desc_en'].forEach(f => {
      if (def[f] !== undefined && (item[f] === undefined || item[f] === '')) item[f] = def[f];
    });
  });
  defArr.forEach(d => { if (!ids.has(d.id)) list.push(JSON.parse(JSON.stringify(d))); });
  return list.length ? list : defArr.slice();
}

function backfillActivities(arr, defArr) {
  if (!Array.isArray(defArr)) return arr || [];
  const defById = {};
  defArr.forEach(d => { defById[d.id] = d; });
  const list = Array.isArray(arr) && arr.length ? arr.slice() : [];
  const ids = new Set(list.map(c => c.id));
  list.forEach((item, idx) => {
    const def = defById[item.id] || defArr[idx];
    if (!def) return;
    if (!item.id && def.id != null) item.id = def.id;
    ['cat', 'cat_en', 'tag', 'tag_en', 'bg', 'image', 'publishedDate', 'date', 'endDate',
     'dateLabel', 'dateLabel_en', 'location', 'location_en', 'link',
     'title', 'title_en'].forEach(f => {
      if (def[f] !== undefined && (item[f] === undefined || item[f] === '')) item[f] = def[f];
    });
    // Facebook CDN URLs expire — replace with durable default when still pointing at fbcdn
    if (def.image && (!item.image || /fbcdn\.net/i.test(item.image))) item.image = def.image;
    if (def.body) item.body = def.body;
    if (def.body_en) item.body_en = def.body_en;
  });
  defArr.forEach(d => { if (!ids.has(d.id)) list.push(JSON.parse(JSON.stringify(d))); });
  return list.length ? list : defArr.slice();
}

/* Sync curriculum from defaults; drop removed courses, append new ones */
function backfillCurriculum(arr, defArr) {
  if (!Array.isArray(defArr)) return arr || [];
  const defById = {};
  const defIds = new Set();
  defArr.forEach(d => { defById[d.id] = d; defIds.add(d.id); });
  const list = Array.isArray(arr) ? arr.filter(item => defIds.has(item.id)) : [];
  list.forEach(item => {
    const def = defById[item.id];
    if (!def) return;
    ['grade', 'type', 'code', 'name', 'teacher', 'sem', 'track', 'pending', 'image'].forEach(f => {
      if (def[f] !== undefined) item[f] = def[f];
    });
    if (def.name_en) item.name_en = def.name_en;
  });
  const ids = new Set(list.map(c => c.id));
  defArr.forEach(d => {
    if (!ids.has(d.id)) list.push(JSON.parse(JSON.stringify(d)));
  });
  return list;
}

/* ── Public API ──────────────────────────────────── */
const CMS = {
  get() {
    try {
      const defaults = JSON.parse(JSON.stringify(DEFAULT_DATA));
      const raw = localStorage.getItem(CMS_KEY);
      const merged = raw ? deepMerge(defaults, JSON.parse(raw)) : defaults;
      backfillEN(merged.departments, DEFAULT_DATA.departments, ['name_en', 'desc_en']);
      backfillEN(merged.news,        DEFAULT_DATA.news,        ['title_en', 'cat_en']);
      backfillEN(merged.activities,  DEFAULT_DATA.activities,  ['title_en', 'cat_en', 'tag_en', 'dateLabel_en', 'location_en', 'body_en']);
      backfillEN(merged.calendar,    DEFAULT_DATA.calendar,    ['title_en', 'location_en', 'desc_en', 'tag_en', 'dateLabel_en', 'body_en']);
      backfillEN(merged.resources,   DEFAULT_DATA.resources,   ['desc_en']);
      merged.resources = backfillResources(merged.resources, DEFAULT_DATA.resources);
      backfillEN(merged.curriculum,  DEFAULT_DATA.curriculum,  ['name_en']);
      merged.curriculum = backfillCurriculum(merged.curriculum, DEFAULT_DATA.curriculum);
      merged.activities = backfillActivities(merged.activities, DEFAULT_DATA.activities);
      merged.calendar = backfillCalendar(merged.calendar, DEFAULT_DATA.calendar);
      // Migrate retired FB proxy URL saved in older localStorage
      if (merged.site && merged.site.fb_api_url === 'https://pds-occ-fb-proxy.onrender.com') {
        merged.site.fb_api_url = DEFAULT_DATA.site.fb_api_url;
      }
      return merged;
    } catch { return JSON.parse(JSON.stringify(DEFAULT_DATA)); }
  },

  save(data) {
    try { localStorage.setItem(CMS_KEY, JSON.stringify(data)); return true; }
    catch { return false; }
  },

  reset() {
    localStorage.removeItem(CMS_KEY);
  },

  getSite()   { return this.get().site; },
  getSlider() { return this.get().slider; },
  getDepts()  { return this.get().departments; },
  getNews()   { return this.get().news; },
  getActivities() {
    const d = this.get();
    return d.activities || JSON.parse(JSON.stringify(DEFAULT_DATA.activities));
  },
  getCalendar() {
    const d = this.get();
    return d.calendar || JSON.parse(JSON.stringify(DEFAULT_DATA.calendar));
  },
  getFaculty()    { return this.get().faculty; },
  getCurriculum() {
    const d = this.get();
    return d.curriculum || JSON.parse(JSON.stringify(DEFAULT_DATA.curriculum));
  },
  getResources()  {
    const d = this.get();
    return d.resources || JSON.parse(JSON.stringify(DEFAULT_DATA.resources));
  },
  getAbout()  { return this.get().about || JSON.parse(JSON.stringify(DEFAULT_DATA.about)); },
  getHeroes() {
    const d = this.get();
    return d.heroes || JSON.parse(JSON.stringify(DEFAULT_DATA.heroes));
  },
  getContact() {
    const d = this.get();
    return { ...JSON.parse(JSON.stringify(DEFAULT_DATA.contact)), ...(d.contact || {}) };
  },
  getLabels() {
    const d = this.get();
    return d.labels || { th: {}, en: {} };
  },
  getMourning() {
    const d = this.get();
    return d.mourning || JSON.parse(JSON.stringify(DEFAULT_DATA.mourning));
  },

  updateSite(site) {
    const d = this.get(); d.site = { ...d.site, ...site }; return this.save(d);
  },
  updateSlider(slider) {
    const d = this.get(); d.slider = slider; return this.save(d);
  },
  updateDepts(depts) {
    const d = this.get(); d.departments = depts; return this.save(d);
  },
  updateNews(news) {
    const d = this.get(); d.news = news; return this.save(d);
  },
  updateActivities(activities) {
    const d = this.get(); d.activities = activities; return this.save(d);
  },
  updateCalendar(calendar) {
    const d = this.get(); d.calendar = calendar; return this.save(d);
  },
  updateFaculty(faculty) {
    const d = this.get(); d.faculty = faculty; return this.save(d);
  },
  updateCurriculum(curriculum) {
    const d = this.get(); d.curriculum = curriculum; return this.save(d);
  },
  updateResources(resources) {
    const d = this.get(); d.resources = resources; return this.save(d);
  },
  updateAbout(about) {
    const d = this.get(); d.about = { ...(d.about || {}), ...about }; return this.save(d);
  },
  updateHeroes(heroes) {
    const d = this.get(); d.heroes = { ...(d.heroes || {}), ...heroes }; return this.save(d);
  },
  updateContact(contact) {
    const d = this.get(); d.contact = { ...(d.contact || {}), ...contact }; return this.save(d);
  },
  updateLabels(labels) {
    const d = this.get(); d.labels = labels; return this.save(d);
  },
  applyToI18n() {
    if (!window.i18n || !window.i18n.T) return;
    const T = window.i18n.T;
    const labels = this.getLabels();
    ['th', 'en'].forEach(lang => {
      const obj = labels[lang];
      if (!obj) return;
      Object.keys(obj).forEach(key => {
        if (obj[key] !== undefined && obj[key] !== '') T[lang][key] = obj[key];
      });
    });
    const ab = this.getAbout();
    if (!ab) return;
    const map = [
      ['phil_badge', 'about.phil.badge'], ['phil_text', 'about.phil.text'], ['phil_sub', 'about.phil.sub'],
      ['vision_text', 'about.vision.text'],
      ['mc1_title', 'about.mc1.title'], ['mc1_text', 'about.mc1.text'],
      ['mc2_title', 'about.mc2.title'], ['mc2_text', 'about.mc2.text'],
      ['mc3_title', 'about.mc3.title'], ['mc3_text', 'about.mc3.text'],
      ['mc4_title', 'about.mc4.title'], ['mc4_text', 'about.mc4.text']
    ];
    map.forEach(([field, key]) => {
      if (ab[field]) T.th[key] = ab[field];
      if (ab[field + '_en']) T.en[key] = ab[field + '_en'];
    });
    const site = this.getSite();
    if (site.name) {
      if (!labels.th['brand.line1']) T.th['brand.line1'] = site.name;
      if (!labels.en['brand.line1']) T.en['brand.line1'] = site.name;
    }
    if (site.school) {
      if (!labels.th['brand.line2']) T.th['brand.line2'] = site.school;
      if (!labels.en['brand.line2']) T.en['brand.line2'] = site.school;
    }
  },
  applyPageExtras() {
    const heroes = this.getHeroes();
    const heroGrad = 'linear-gradient(160deg, rgba(10,6,28,.92) 0%, rgba(30,18,65,.88) 55%, rgba(50,25,72,.85) 100%)';
    document.querySelectorAll('[data-cms-hero]').forEach(el => {
      const page = el.dataset.cmsHero;
      const img = heroes[page] && heroes[page].image;
      if (img) {
        el.style.background = `${heroGrad}, url('${img}') center 40% / cover no-repeat`;
      }
    });
    const c = this.getContact();
    document.querySelectorAll('[data-cms-href]').forEach(el => {
      const url = c[el.dataset.cmsHref];
      if (url) el.href = url;
    });
    document.querySelectorAll('[data-cms-text]').forEach(el => {
      const val = c[el.dataset.cmsText];
      if (val) el.textContent = val;
    });
    document.querySelectorAll('[data-cms-mailto]').forEach(el => {
      const val = c[el.dataset.cmsMailto];
      if (val) { el.href = 'mailto:' + val; el.textContent = val; }
    });
    document.querySelectorAll('[data-cms-tel]').forEach(el => {
      const val = c[el.dataset.cmsTel];
      if (val) { el.href = 'tel:' + val.replace(/\s/g, ''); el.textContent = val; }
    });
  },
  updateMourning(mourning) {
    const d = this.get(); d.mourning = { ...(d.mourning || {}), ...mourning }; return this.save(d);
  },

  nextId(arr) {
    return arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1;
  }
};

window.CMS = CMS;
