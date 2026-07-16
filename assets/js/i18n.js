/**
 * i18n.js — Thai / English language toggle for PDS OCC website
 * Usage: add data-i18n="key" to any element whose text should swap.
 *        For placeholders: data-i18n-placeholder="key"
 *        For HTML content: data-i18n-html="key"
 * Language preference saved to localStorage under 'pds-lang'.
 */
(function () {
  'use strict';

  /* ─────────────────────────────────────────
     TRANSLATION DICTIONARY
  ───────────────────────────────────────── */
  const T = {
    th: {
      /* ── NAVBAR ── */
      'nav.home':       'หน้าแรก',
      'nav.about':      'เกี่ยวกับเรา',
      'nav.faculty':    'บุคลากร',
      'nav.curriculum': 'หลักสูตร',
      'nav.resources':  'แหล่งเรียนรู้',
      'nav.pr':         'ประชาสัมพันธ์',
      'nav.news':       'ข่าวสาร',
      'nav.contact':    'ติดต่อ',
      'nav.sub.philosophy': 'ปรัชญา',
      'nav.sub.vision':     'วิสัยทัศน์',
      'nav.sub.mission':    'พันธกิจ',
      'nav.sub.faculty':    'บุคลากร',
      'nav.sub.grade1':     'มัธยมศึกษาปีที่ 1',
      'nav.sub.grade2':     'มัธยมศึกษาปีที่ 2',
      'nav.sub.grade3':     'มัธยมศึกษาปีที่ 3',
      'nav.sub.grade4':     'มัธยมศึกษาปีที่ 4',
      'nav.sub.grade5':     'มัธยมศึกษาปีที่ 5',
      'nav.sub.grade6':     'มัธยมศึกษาปีที่ 6',
      'nav.sub.book':       'หนังสือ',
      'nav.sub.website':    'เว็บไซต์',
      'nav.sub.journal':    'วารสาร',
      'nav.sub.research':   'งานวิจัย',
      'nav.sub.prActivities': 'กิจกรรม',
      'nav.sub.news':         'ข่าวสาร',
      'nav.sub.calendar':     'ปฏิทินกิจกรรม',
      'brand.line1':    'กลุ่มสาระการเรียนรู้เทคโนโลยี',
      'brand.line2':    'โรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ ปทุมวัน',
      'nav.aria':       'เมนูหลัก',
      'burger.aria':    'เปิดเมนู',
      'aria.lang':      'เลือกภาษา',
      'aria.search':    'ค้นหา',
      'common.skip':    'ข้ามไปยังเนื้อหาหลัก',
      'cookie.aria':    'การแจ้งเตือนคุกกี้',
      'cookie.title':   'คุกกี้ & ความเป็นส่วนตัว',
      'cookie.message': 'เราใช้คุกกี้เพื่อจดจำภาษาและการตั้งค่าของคุณ ช่วยให้เว็บไซต์ใช้งานได้สะดวกและปลอดภัยยิ่งขึ้น',
      'cookie.accept':  'ยอมรับทั้งหมด',
      'cookie.policy':  'ดูรายละเอียด',

      /* ── NEWS PAGE ── */
      'news.hero.eyebrow': 'กลุ่มสาระเทคโนโลยี · PDS',
      'news.hero.title':   'ข่าวสาร',
      'news.hero.sub':     'โพสต์ล่าสุดจากกลุ่มสาระการเรียนรู้เทคโนโลยี โรงเรียนสาธิตปทุมวัน มศว',
      'news.hero.fb':      'ติดตาม Facebook Page',
      'news.status.live':  'ดึงข้อมูลจาก Facebook โดยตรง',
      'news.count':        'แสดง {n} โพสต์ล่าสุด',
      'news.loadmore':     'โหลดเพิ่มเติม',
      'news.loading':      'กำลังโหลด…',
      'news.readpost':     'อ่านโพสต์ต้นฉบับ',
      'news.error.title':  'ไม่สามารถโหลดข้อมูลจาก Facebook ได้',
      'news.error.sub':    'Server อาจยังกำลังตื่น กรุณารอสักครู่แล้วลองอีกครั้ง',
      'news.retry':        'ลองอีกครั้ง',

      /* ── FOOTER ── */
      'footer.name':    'กลุ่มสาระการเรียนรู้เทคโนโลยี โรงเรียนสาธิต มศว ปทุมวัน',
      'footer.copy':    'Copyright © 2026 (Computer Department of Patumwan Demonstrations School) All rights reserved.',

      /* ── INDEX PAGE ── */
      'index.kicker':     'กลุ่มสาระการเรียนรู้',
      'index.title':      'กลุ่มสาระการเรียนรู้เทคโนโลยี',
      'index.school':     'โรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ ปทุมวัน',
      'index.tagline':    'สมรรถภาพในการปรับตัว คือความสำเร็จในชีวิต',
      'index.dept.title': 'สาขารายวิชาที่เปิดสอน',
      'index.dept.sub':   '9 สาขาวิชาในกลุ่มสาระเทคโนโลยี',
      'index.see.all':      'ดูทั้งหมด',
      'index.news.title':   'ข่าวสาร',
      'index.activity.title': 'กิจกรรม',
      'index.news.follow':  'ติดตามบน Facebook',
      'index.news.readmore':'อ่านเพิ่มเติม',
      'index.news.loading': 'กำลังโหลดข่าวสารจาก Facebook…',
      'index.news.fbcat':   'Facebook · กลุ่มสาระเทคโนโลยี',

      /* ════════════════════════════════════
         ABOUT PAGE
      ════════════════════════════════════ */
      'about.hero.eyebrow': 'About Us',
      'about.hero.title':   'เกี่ยวกับเรา',
      'about.hero.sub':     'ปรัชญา วิสัยทัศน์ พันธกิจ',

      'about.stat.dept.num':    '9',
      'about.stat.dept.label':  'สาขาวิชา\nDepartments',
      'about.stat.teach.num':   '12',
      'about.stat.teach.label': 'ครูผู้สอน\nTeachers',
      'about.stat.stu.num':     '600',
      'about.stat.stu.label':   'นักเรียน\nStudents',
      'about.stat.yr.num':      '30',
      'about.stat.yr.label':    'ปีแห่งประสบการณ์\nYears of Experience',

      'about.phil.badge': 'ปรัชญา · Philosophy',
      'about.phil.text':  '<em>ความรู้และทักษะในงาน</em> สร้างเสริมประสบการณ์<em>ทักษะชีวิต</em>',
      'about.phil.sub':   'กลุ่มสาระเทคโนโลยีเชื่อมั่นว่า การเรียนรู้ที่มีคุณภาพต้องเชื่อมโยงทั้งความรู้เชิงวิชาการ และประสบการณ์จริง เพื่อสร้างผู้เรียนที่มีทักษะพร้อมสำหรับโลกยุคใหม่',

      'about.vision.eyebrow': 'Vision',
      'about.vision.label':   'วิสัยทัศน์',
      'about.vision.text':    'เป็นแหล่งเรียนรู้วิชาการ และฝึกฝนประสบการณ์วิชาอาชีพ เพื่อส่งเสริมพัฒนาการทักษะ และแสวงหาความก้าวหน้าตามความสันทัดส่วนตน อย่างคนมีศักยภาพ',

      'about.mission.eyebrow': 'Mission',
      'about.mission.label':   'พันธกิจ',
      'about.mc1.title': 'ส่งเสริมทักษะชีวิต',
      'about.mc1.text':  'พัฒนาทักษะที่จำเป็นสำหรับการดำรงชีวิตในโลกยุคใหม่อย่างมีประสิทธิภาพ',
      'about.mc2.title': 'พัฒนาทักษะอาชีพ',
      'about.mc2.text':  'เสริมสร้างความรู้และทักษะด้านการประกอบอาชีพในสาขาที่หลากหลาย',
      'about.mc3.title': 'เทคโนโลยีดิจิทัล',
      'about.mc3.text':  'ฝึกทักษะด้านเทคโนโลยีสารสนเทศและดิจิทัล เพื่อรับมือโลกอนาคต',
      'about.mc4.title': 'เสริมสร้างศักยภาพ',
      'about.mc4.text':  'พัฒนาผู้เรียนให้มีศักยภาพและค้นพบความถนัดตามความสนใจส่วนตน',

      'about.dept.title': '9 สาขาวิชาในกลุ่มสาระเทคโนโลยี',
      'about.dept.sub':   'เรียนรู้ ลงมือทำ พัฒนาศักยภาพของคุณ',
      'about.dept.more':  'ดูเพิ่มเติม',
      'about.dept.1.name': 'AI & Machine Learning',
      'about.dept.1.desc': 'ปัญญาประดิษฐ์และการเรียนรู้ของเครื่อง',
      'about.dept.2.name': 'Robotics',
      'about.dept.2.desc': 'หุ่นยนต์และระบบอัตโนมัติ',
      'about.dept.3.name': 'Drone Technology',
      'about.dept.3.desc': 'เทคโนโลยีอากาศยานไร้คนขับ',
      'about.dept.4.name': 'Coding & Computer Science',
      'about.dept.4.desc': 'การเขียนโปรแกรมและวิทยาการคอมพิวเตอร์',
      'about.dept.5.name': 'Computer Graphics',
      'about.dept.5.desc': 'กราฟิกและงานออกแบบดิจิทัล',
      'about.dept.6.name': 'Digital Media',
      'about.dept.6.desc': 'สื่อดิจิทัลและการผลิตสื่อ',
      'about.dept.7.name': 'Design & Technology',
      'about.dept.7.desc': 'การออกแบบและเทคโนโลยีการผลิต',
      'about.dept.8.name': 'E-Sports',
      'about.dept.8.desc': 'กีฬาอิเล็กทรอนิกส์และการแข่งขัน',
      'about.dept.9.name': 'Data Science',
      'about.dept.9.desc': 'วิทยาการข้อมูลและการวิเคราะห์',

      /* ════════════════════════════════════
         FACULTY PAGE
      ════════════════════════════════════ */
      'faculty.hero.eyebrow': 'Faculty',
      'faculty.hero.title':   'บุคลากร',
      'faculty.hero.sub':     'คณะผู้บริหารและครูผู้สอนกลุ่มสาระการเรียนรู้เทคโนโลยี',

      'faculty.sec.eyebrow': 'Administration',
      'faculty.sec.title':   'โครงสร้างการบริหารงาน ปีการศึกษา 2569 – 2571',

      'faculty.director.role': 'ผู้อำนวยการ · Director',
      'faculty.director.dept': 'ผู้อำนวยการโรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ ปทุมวัน',
      'faculty.deputy.role':   'รองผู้อำนวยการ · Deputy Director',
      'faculty.deputy.dept':   'รองผู้อำนวยการฝ่ายวิชาการวิจัย และพันธกิจสัมพันธ์เพื่อสังคม',
      'faculty.head.role':     'หัวหน้ากลุ่มสาระ · Head of Dept.',
      'faculty.head.dept':     'หัวหน้ากลุ่มสาระการเรียนรู้เทคโนโลยี',

      'tc.dept.computer': 'วิชาเทคโนโลยีสารสนเทศ',
      'tc.dept.business':  'วิชาการงานอาชีพ',
      'tc.dept.homeec':    'วิชาการดำรงชีวิต',
      'tc.dept.design':    'วิชางานช่างและออกแบบ',
      'tc.dept.media':     'วิชาการออกแบบและสื่อ',
      'tc.dept.commerce':  'วิชาพาณิชยกรรม',
      'tc.dept.aibot':     'วิชาปัญญาประดิษฐ์และหุ่นยนต์',

      /* ════════════════════════════════════
         CURRICULUM PAGE
      ════════════════════════════════════ */
      'curr.hero.eyebrow': 'Curriculum',
      'curr.hero.title':   'หลักสูตร',
      'curr.hero.sub':     'รายวิชาในกลุ่มสาระการเรียนรู้เทคโนโลยี แบ่งตามระดับชั้น ม.1 – ม.6',

      'curr.sec.eyebrow': 'Grade Levels',
      'curr.sec.title':   'ระดับชั้นที่เปิดสอน',
      'curr.sec.desc':    'เลือกระดับชั้นเพื่อดูรายวิชาที่เปิดสอนในแต่ละปีการศึกษา',

      'curr.grade.lower': 'มัธยมต้น',
      'curr.grade.upper': 'มัธยมปลาย',

      'curr.ctype.core': 'วิชาพื้นฐาน',
      'curr.ctype.elec': 'วิชาเลือกเพิ่ม',
      'curr.ctype.eng':  'วิชาเอก',
      'curr.ctype.add':  'วิชาเพิ่มเติม',

      'curr.legend.ai':  '= เฉพาะนักเรียนสาขาปัญญาประดิษฐ์',
      'curr.legend.dmt': '= เฉพาะนักเรียนสาขาดิจิทัลมีเดีย',
      'curr.pending':    'รอเปิดใช้งาน',
      'curr.sem':        'เทอม',

      'curr.tab.1': 'ม.1',
      'curr.tab.2': 'ม.2',
      'curr.tab.3': 'ม.3',
      'curr.tab.4': 'ม.4',
      'curr.tab.5': 'ม.5',
      'curr.tab.6': 'ม.6',

      'curr.badge.ai':  'เอก AI',
      'curr.badge.dmt': 'เอก DMT',
      'curr.empty':     'ยังไม่มีรายวิชา',
      'curr.sem.word':  'เทอม',
      'curr.teacher.tbd': '—',

      'curr.grade.1.badge': 'มัธยมศึกษาปีที่ 1',
      'curr.grade.1.title': 'รายวิชาชั้นมัธยมศึกษาปีที่ 1',
      'curr.grade.2.badge': 'มัธยมศึกษาปีที่ 2',
      'curr.grade.2.title': 'รายวิชาชั้นมัธยมศึกษาปีที่ 2',
      'curr.grade.3.badge': 'มัธยมศึกษาปีที่ 3',
      'curr.grade.3.title': 'รายวิชาชั้นมัธยมศึกษาปีที่ 3',
      'curr.grade.4.badge': 'มัธยมศึกษาปีที่ 4',
      'curr.grade.4.title': 'รายวิชาชั้นมัธยมศึกษาปีที่ 4',
      'curr.grade.5.badge': 'มัธยมศึกษาปีที่ 5',
      'curr.grade.5.title': 'รายวิชาชั้นมัธยมศึกษาปีที่ 5',
      'curr.grade.6.badge': 'มัธยมศึกษาปีที่ 6',
      'curr.grade.6.title': 'รายวิชาชั้นมัธยมศึกษาปีที่ 6',

      /* ════════════════════════════════════
         RESOURCES PAGE
      ════════════════════════════════════ */
      'res.hero.eyebrow': 'Learning Resources',
      'res.hero.title':   'แหล่งเรียนรู้',
      'res.hero.sub':     'รวมเว็บไซต์ เครื่องมือ และแพลตฟอร์มสำหรับการเรียนรู้',

      'res.sec.eyebrow': 'Learning Platforms',
      'res.sec.title':   'แพลตฟอร์มการเรียนรู้',
      'res.sec.desc':    'เว็บไซต์และเครื่องมือสำหรับเรียน AI หุ่นยนต์ โดรน กราฟิก และดิจิทัลมีเดีย',

      'res.sec.book.eyebrow':     'Books',
      'res.sec.book.title':       'หนังสือ',
      'res.sec.book.desc':        'หนังสือและตำราเรียนออนไลน์ฟรีด้านเทคโนโลยีและการเขียนโปรแกรม',
      'res.sec.website.eyebrow':  'Websites',
      'res.sec.website.title':    'เว็บไซต์',
      'res.sec.website.desc':     'เว็บไซต์และเครื่องมือสำหรับเรียน AI หุ่นยนต์ โดรน กราฟิก และดิจิทัลมีเดีย',
      'res.sec.journal.eyebrow':  'Journals',
      'res.sec.journal.title':    'วารสาร',
      'res.sec.journal.desc':     'วารสารและนิตยสารวิชาการด้านเทคโนโลยีและวิทยาการคอมพิวเตอร์',
      'res.sec.research.eyebrow': 'Research',
      'res.sec.research.title':   'งานวิจัย',
      'res.sec.research.desc':    'ฐานข้อมูลและคลังงานวิจัยวิชาการสำหรับการค้นคว้า',
      'res.empty':                'ยังไม่มีรายการในหมวดนี้',

      'res.cat.ai':     'ปัญญาประดิษฐ์',
      'res.cat.robot':  'หุ่นยนต์',
      'res.cat.drone':  'โดรน',
      'res.cat.graphic':'กราฟิก',
      'res.cat.media':  'ดิจิทัลมีเดีย',
      'res.cat.code':   'โปรแกรมมิง',

      /* ════════════════════════════════════
         CONTACT PAGE
      ════════════════════════════════════ */
      'contact.hero.eyebrow': 'Contact Us',
      'contact.hero.title':   'ติดต่อเรา',
      'contact.hero.sub':     'สอบถามข้อมูลเกี่ยวกับหลักสูตร กิจกรรม หรือการเข้าร่วมกลุ่มสาระ',

      'contact.sec.eyebrow': 'Get in Touch',
      'contact.sec.title':   'ติดต่อกลุ่มสาระฯ',
      'contact.sec.desc':    'เราพร้อมตอบทุกคำถามเกี่ยวกับหลักสูตรและกิจกรรมของกลุ่มสาระฯ',

      'contact.chan.title':  'ช่องทางการติดต่อ',
      'contact.chan.desc':   'ติดต่อกลุ่มสาระการเรียนรู้เทคโนโลยีผ่านช่องทางด้านล่าง',

      'contact.info.eyebrow': 'Contact Information',
      'contact.info.title':   'ข้อมูลการติดต่อ',
      'contact.info.desc':    'ข้อมูลสำหรับติดต่อกลุ่มสาระการเรียนรู้เทคโนโลยี โรงเรียนสาธิตปทุมวัน',

      'contact.addr.label':  'ที่อยู่',
      'contact.addr.value':  'ถนนอังรีดูนังต์ แขวงปทุมวัน เขตปทุมวัน กรุงเทพมหานคร 10330',
      'contact.addr.sub':    'โรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ ปทุมวัน',
      'contact.phone.label': 'โทรศัพท์',
      'contact.phone.sub':   'วันและเวลาราชการ จ–ศ 8:00–17:00',
      'contact.email.label': 'อีเมล',
      'contact.email.sub':   'ตอบกลับภายใน 1–2 วันทำการ',
      'contact.web.label':   'เว็บไซต์',
      'contact.web.value':   'Google Sites กลุ่มสาระฯ',
      'contact.web.sub':     'เอกสารและข้อมูลกลุ่มสาระเทคโนโลยี',

      'contact.dept.name':               'กลุ่มสาระการเรียนรู้เทคโนโลยี',
      'contact.school.name':             'โรงเรียนสาธิตมหาวิทยาลัยศรีนครินทรวิโรฒ ปทุมวัน',
      'contact.chan.eyebrow':            'Get in Touch',
      'contact.fb.label':                'Facebook Page',
      'contact.fb.value':                'กลุ่มสาระการเรียนรู้เทคโนโลยี โรงเรียนสาธิต มศว ปทุมวัน',
      'contact.fb.sub':                  'ติดตามข่าวสารและกิจกรรมล่าสุด',
      'contact.hours.label':             'เวลาทำการ',
      'contact.hours.value':             'จันทร์–ศุกร์  8:00–17:00 น.',
      'contact.social.fb':               'ติดตาม Facebook Page',
      'contact.social.maps':             'ดูแผนที่',

      'contact.form.eyebrow':            'Send a Message',
      'contact.form.title':              'ส่งข้อความถึงเรา',
      'contact.form.desc':               'กรอกข้อมูลแล้วกด "ส่งข้อความ" ระบบจะส่งอีเมลถึงเราโดยอัตโนมัติค่ะ',
      'contact.form.fname.label':        'ชื่อ',
      'contact.form.fname.placeholder':  'ชื่อจริง',
      'contact.form.lname.label':        'นามสกุล',
      'contact.form.lname.placeholder':  'นามสกุล',
      'contact.form.email.label':        'อีเมล',
      'contact.form.phone.label':        'เบอร์โทรศัพท์',
      'contact.form.phone.placeholder':  '08x-xxx-xxxx',
      'contact.form.subject.label':      'หัวข้อ',
      'contact.form.subject.opt0':       '— เลือกหัวข้อ —',
      'contact.form.subject.opt1':       'สอบถามหลักสูตร',
      'contact.form.subject.opt2':       'สอบถามกิจกรรม',
      'contact.form.subject.opt3':       'สอบถามบุคลากร',
      'contact.form.subject.opt4':       'ข้อเสนอแนะ',
      'contact.form.subject.opt5':       'อื่น ๆ',
      'contact.form.msg.label':          'ข้อความ',
      'contact.form.msg.placeholder':    'เขียนข้อความที่ต้องการสอบถาม...',
      'contact.form.submit':             'ส่งข้อความ',
      'contact.form.sending':            'กำลังส่ง...',
      'contact.form.validate':           'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน',
      'contact.form.success.msg':        'ส่งข้อความสำเร็จ — เราจะติดต่อกลับโดยเร็วที่สุดค่ะ',
      'contact.form.error.msg':          'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งค่ะ',

      'pr.hero.eyebrow': 'Public Relations',
      'pr.hero.title': 'ประชาสัมพันธ์',
      'pr.hero.sub':   'กิจกรรมและปฏิทินกิจกรรมของกลุ่มสาระการเรียนรู้เทคโนโลยี',

      /* ── PR: ACTIVITIES PAGE ── */
      'act.hero.eyebrow': 'Public Relations · PDS',
      'act.hero.title':   'ประชาสัมพันธ์กิจกรรม',
      'act.hero.sub':     'กิจกรรมและโครงการของกลุ่มสาระการเรียนรู้เทคโนโลยี',
      'act.detail.published': 'ประกาศวันที่',
      'act.detail.dateRange': 'วันที่เริ่ม - วันที่สิ้นสุด',
      'act.detail.external': 'ดูเพิ่มเติม',
      'act.detail.notFound': 'ไม่พบกิจกรรมที่ต้องการ',

      /* ── PR: CALENDAR PAGE ── */
      'cal.hero.eyebrow': 'Public Relations · PDS',
      'cal.hero.title':   'ปฏิทินกิจกรรม',
      'cal.hero.sub':     'ตารางกิจกรรมที่สามารถประกาศและอัปเดตผ่านระบบ Admin',
      'cal.days':         'อา,จ,อ,พ,พฤ,ศ,ส',
      'cal.prev':         'เดือนก่อนหน้า',
      'cal.next':         'เดือนถัดไป',
      'cal.selected':     'กิจกรรมวันที่เลือก',
      'cal.monthEvents':  'กิจกรรมในเดือนนี้',
      'cal.empty':        'ยังไม่มีกิจกรรมในวันนี้',
      'cal.monthEmpty':   'ยังไม่มีกิจกรรมในเดือนนี้',
      'cal.more':         'ดูรายละเอียด',
      'cal.listTitle':    'รายการกิจกรรม',
      'cal.listCat':      'ปฏิทินกิจกรรม',
    },

    en: {
      /* ── NAVBAR ── */
      'nav.home':       'Home',
      'nav.about':      'About Us',
      'nav.faculty':    'Faculty',
      'nav.curriculum': 'Curriculum',
      'nav.resources':  'Resources',
      'nav.pr':         'Public Relations',
      'nav.news':       'News',
      'nav.contact':    'Contact',
      'nav.sub.philosophy': 'Philosophy',
      'nav.sub.vision':     'Vision',
      'nav.sub.mission':    'Mission',
      'nav.sub.faculty':    'Faculty',
      'nav.sub.grade1':     'Grade 7 (M.1)',
      'nav.sub.grade2':     'Grade 8 (M.2)',
      'nav.sub.grade3':     'Grade 9 (M.3)',
      'nav.sub.grade4':     'Grade 10 (M.4)',
      'nav.sub.grade5':     'Grade 11 (M.5)',
      'nav.sub.grade6':     'Grade 12 (M.6)',
      'nav.sub.book':       'Books',
      'nav.sub.website':    'Websites',
      'nav.sub.journal':    'Journals',
      'nav.sub.research':   'Research',
      'nav.sub.prActivities': 'Activities',
      'nav.sub.news':         'News',
      'nav.sub.calendar':     'Activity Calendar',
      'brand.line1':    'Technology Learning Group',
      'brand.line2':    'Patumwan Demonstration School, SWU',
      'nav.aria':       'Main Navigation',
      'burger.aria':    'Open Menu',
      'aria.lang':      'Select language',
      'aria.search':    'Search',
      'common.skip':    'Skip to main content',
      'cookie.aria':    'Cookie notice',
      'cookie.title':   'Cookies & Privacy',
      'cookie.message': 'We use cookies to remember your language and settings, making the site easier and safer to use.',
      'cookie.accept':  'Accept all',
      'cookie.policy':  'Learn more',

      /* ── NEWS PAGE ── */
      'news.hero.eyebrow': 'Technology Group · PDS',
      'news.hero.title':   'News',
      'news.hero.sub':     'Latest posts from the Technology Learning Group, Patumwan Demonstration School, SWU',
      'news.hero.fb':      'Follow Facebook Page',
      'news.status.live':  'Live from Facebook',
      'news.count':        'Showing {n} latest posts',
      'news.loadmore':     'Load More',
      'news.loading':      'Loading…',
      'news.readpost':     'Read original post',
      'news.error.title':  'Could not load posts from Facebook',
      'news.error.sub':    'The server may be waking up. Please wait a moment and try again.',
      'news.retry':        'Try Again',

      /* ── FOOTER ── */
      'footer.name':    'Technology Learning Group, Patumwan Demonstration School, SWU',
      'footer.copy':    'Copyright © 2026 (Computer Department of Patumwan Demonstrations School) All rights reserved.',

      /* ── INDEX PAGE ── */
      'index.kicker':     'Learning Group',
      'index.title':      'Technology Learning Group',
      'index.school':     'Patumwan Demonstration School, Srinakharinwirot University',
      'index.tagline':    'Adaptability is the Key to Success in Life',
      'index.dept.title': 'Departments',
      'index.dept.sub':   '9 Departments in the Technology Group',
      'index.see.all':      'See All',
      'index.news.title':   'News',
      'index.activity.title': 'Activities',
      'index.news.follow':  'Follow on Facebook',
      'index.news.readmore':'Read More',
      'index.news.loading': 'Loading news from Facebook…',
      'index.news.fbcat':   'Facebook · Technology Group',

      /* ════════════════════════════════════
         ABOUT PAGE
      ════════════════════════════════════ */
      'about.hero.eyebrow': 'About Us',
      'about.hero.title':   'About Us',
      'about.hero.sub':     'Philosophy, Vision & Mission',

      'about.stat.dept.num':    '9',
      'about.stat.dept.label':  'Departments',
      'about.stat.teach.num':   '12',
      'about.stat.teach.label': 'Teachers',
      'about.stat.stu.num':     '600',
      'about.stat.stu.label':   'Students',
      'about.stat.yr.num':      '30',
      'about.stat.yr.label':    'Years of Experience',

      'about.phil.badge': 'Philosophy',
      'about.phil.text':  '<em>Knowledge and skills in work</em> build and enrich <em>life experience</em>',
      'about.phil.sub':   'The Technology Learning Group believes that quality learning must connect academic knowledge with real experience, creating learners who are ready for the modern world.',

      'about.vision.eyebrow': 'Vision',
      'about.vision.label':   'Vision',
      'about.vision.text':    'To be a center for academic learning and professional experience, promoting skill development and advancement according to individual potential, for capable individuals.',

      'about.mission.eyebrow': 'Mission',
      'about.mission.label':   'Mission',
      'about.mc1.title': 'Life Skills',
      'about.mc1.text':  'Develop essential skills for living effectively in the modern world.',
      'about.mc2.title': 'Vocational Skills',
      'about.mc2.text':  'Build knowledge and skills for diverse career paths.',
      'about.mc3.title': 'Digital Technology',
      'about.mc3.text':  'Train information technology and digital skills to prepare for the future.',
      'about.mc4.title': 'Potential Building',
      'about.mc4.text':  'Develop learners to discover their strengths and personal interests.',

      'about.dept.title': '9 Departments in the Technology Learning Group',
      'about.dept.sub':   'Learn, Practice, Develop Your Potential',
      'about.dept.more':  'Learn More',
      'about.dept.1.name': 'AI & Machine Learning',
      'about.dept.1.desc': 'Artificial Intelligence and Machine Learning',
      'about.dept.2.name': 'Robotics',
      'about.dept.2.desc': 'Robotics and Automation Systems',
      'about.dept.3.name': 'Drone Technology',
      'about.dept.3.desc': 'Unmanned Aerial Vehicle Technology',
      'about.dept.4.name': 'Coding & Computer Science',
      'about.dept.4.desc': 'Programming and Computer Science',
      'about.dept.5.name': 'Computer Graphics',
      'about.dept.5.desc': 'Digital Graphics and Design',
      'about.dept.6.name': 'Digital Media',
      'about.dept.6.desc': 'Digital Media and Production',
      'about.dept.7.name': 'Design & Technology',
      'about.dept.7.desc': 'Design and Manufacturing Technology',
      'about.dept.8.name': 'E-Sports',
      'about.dept.8.desc': 'Electronic Sports and Competition',
      'about.dept.9.name': 'Data Science',
      'about.dept.9.desc': 'Data Science and Analytics',

      /* ════════════════════════════════════
         FACULTY PAGE
      ════════════════════════════════════ */
      'faculty.hero.eyebrow': 'Faculty',
      'faculty.hero.title':   'Faculty',
      'faculty.hero.sub':     'Administrators and Teachers of the Technology Learning Group',

      'faculty.sec.eyebrow': 'Administration',
      'faculty.sec.title':   'Organizational Structure, Academic Year 2026–2028',

      'faculty.director.role': 'Director',
      'faculty.director.dept': 'Director, Patumwan Demonstration School, Srinakharinwirot University',
      'faculty.deputy.role':   'Deputy Director',
      'faculty.deputy.dept':   'Deputy Director for Academic Research and Social Engagement',
      'faculty.head.role':     'Head of Department',
      'faculty.head.dept':     'Head of Technology Learning Group',

      'tc.dept.computer': 'Information Technology',
      'tc.dept.business':  'Vocational Education',
      'tc.dept.homeec':    'Home Economics',
      'tc.dept.design':    'Crafts & Design',
      'tc.dept.media':     'Design & Media',
      'tc.dept.commerce':  'Commerce',
      'tc.dept.aibot':     'AI & Robotics',

      /* ════════════════════════════════════
         CURRICULUM PAGE
      ════════════════════════════════════ */
      'curr.hero.eyebrow': 'Curriculum',
      'curr.hero.title':   'Curriculum',
      'curr.hero.sub':     'Technology Learning Group courses by grade level, M.1–M.6',

      'curr.sec.eyebrow': 'Grade Levels',
      'curr.sec.title':   'Available Grade Levels',
      'curr.sec.desc':    'Select a grade level to view courses offered each academic year.',

      'curr.grade.lower': 'Junior High',
      'curr.grade.upper': 'Senior High',

      'curr.ctype.core': 'Core Subjects',
      'curr.ctype.elec': 'Elective Subjects',
      'curr.ctype.eng':  'Major Subjects',
      'curr.ctype.add':  'Additional Subjects',

      'curr.legend.ai':  '= AI Track students only',
      'curr.legend.dmt': '= Digital Media Track students only',
      'curr.pending':    'Coming Soon',
      'curr.sem':        'Semester',

      'curr.tab.1': 'G.7',
      'curr.tab.2': 'G.8',
      'curr.tab.3': 'G.9',
      'curr.tab.4': 'G.10',
      'curr.tab.5': 'G.11',
      'curr.tab.6': 'G.12',

      'curr.badge.ai':  'AI Major',
      'curr.badge.dmt': 'DMT Major',
      'curr.empty':     'No courses yet',
      'curr.sem.word':  'Sem',
      'curr.teacher.tbd': '—',

      'curr.grade.1.badge': 'Grade 7',
      'curr.grade.1.title': 'Grade 7 Courses',
      'curr.grade.2.badge': 'Grade 8',
      'curr.grade.2.title': 'Grade 8 Courses',
      'curr.grade.3.badge': 'Grade 9',
      'curr.grade.3.title': 'Grade 9 Courses',
      'curr.grade.4.badge': 'Grade 10',
      'curr.grade.4.title': 'Grade 10 Courses',
      'curr.grade.5.badge': 'Grade 11',
      'curr.grade.5.title': 'Grade 11 Courses',
      'curr.grade.6.badge': 'Grade 12',
      'curr.grade.6.title': 'Grade 12 Courses',

      /* ════════════════════════════════════
         RESOURCES PAGE
      ════════════════════════════════════ */
      'res.hero.eyebrow': 'Learning Resources',
      'res.hero.title':   'Learning Resources',
      'res.hero.sub':     'Websites, tools, and platforms for learning',

      'res.sec.eyebrow': 'Learning Platforms',
      'res.sec.title':   'Learning Platforms',
      'res.sec.desc':    'Websites and tools for AI, Robotics, Drones, Graphics, and Digital Media',

      'res.sec.book.eyebrow':     'Books',
      'res.sec.book.title':       'Books',
      'res.sec.book.desc':        'Free online books and textbooks on technology and programming',
      'res.sec.website.eyebrow':  'Websites',
      'res.sec.website.title':    'Websites',
      'res.sec.website.desc':     'Websites and tools for AI, Robotics, Drones, Graphics, and Digital Media',
      'res.sec.journal.eyebrow':  'Journals',
      'res.sec.journal.title':    'Journals',
      'res.sec.journal.desc':     'Academic journals and magazines on technology and computer science',
      'res.sec.research.eyebrow': 'Research',
      'res.sec.research.title':   'Research',
      'res.sec.research.desc':    'Databases and research repositories for academic study',
      'res.empty':                'No items in this category yet',

      'res.cat.ai':     'Artificial Intelligence',
      'res.cat.robot':  'Robotics',
      'res.cat.drone':  'Drone',
      'res.cat.graphic':'Graphics',
      'res.cat.media':  'Digital Media',
      'res.cat.code':   'Coding',

      /* ════════════════════════════════════
         CONTACT PAGE
      ════════════════════════════════════ */
      'contact.hero.eyebrow': 'Contact Us',
      'contact.hero.title':   'Contact Us',
      'contact.hero.sub':     'Inquire about our curriculum, activities, or how to join.',

      'contact.sec.eyebrow': 'Get in Touch',
      'contact.sec.title':   'Contact the Department',
      'contact.sec.desc':    'We are ready to answer any questions about our curriculum and activities.',

      'contact.chan.title':  'Contact Channels',
      'contact.chan.desc':   'Contact the Technology Learning Group through the channels below.',

      'contact.info.eyebrow': 'Contact Information',
      'contact.info.title':   'Contact Information',
      'contact.info.desc':    'Contact details for the Technology Learning Group at Patumwan Demonstration School.',

      'contact.addr.label':  'Address',
      'contact.addr.value':  'Henri Dunant Rd, Pathumwan, Bangkok 10330',
      'contact.addr.sub':    'Patumwan Demonstration School, Srinakharinwirot University',
      'contact.phone.label': 'Phone',
      'contact.phone.sub':   'Mon–Fri, 8:00–17:00',
      'contact.email.label': 'Email',
      'contact.email.sub':   'Reply within 1–2 business days',
      'contact.web.label':   'Website',
      'contact.web.value':   'Department Google Site',
      'contact.web.sub':     'Documents and info for the Technology Learning Group',

      'contact.dept.name':               'Technology Learning Group',
      'contact.school.name':             'Patumwan Demonstration School, SWU',
      'contact.chan.eyebrow':            'Get in Touch',
      'contact.fb.label':                'Facebook Page',
      'contact.fb.value':                'Technology Dept., Patumwan Demonstration School, SWU',
      'contact.fb.sub':                  'Follow for the latest news and activities',
      'contact.hours.label':             'Office Hours',
      'contact.hours.value':             'Mon–Fri  8:00–17:00',
      'contact.social.fb':               'Follow Facebook Page',
      'contact.social.maps':             'View on Maps',

      'contact.form.eyebrow':            'Send a Message',
      'contact.form.title':              'Send Us a Message',
      'contact.form.desc':               'Fill in the form and click "Send" — we\'ll receive your message instantly.',
      'contact.form.fname.label':        'First Name',
      'contact.form.fname.placeholder':  'First name',
      'contact.form.lname.label':        'Last Name',
      'contact.form.lname.placeholder':  'Last name',
      'contact.form.email.label':        'Email',
      'contact.form.phone.label':        'Phone Number',
      'contact.form.phone.placeholder':  '08x-xxx-xxxx',
      'contact.form.subject.label':      'Subject',
      'contact.form.subject.opt0':       '— Select a subject —',
      'contact.form.subject.opt1':       'Curriculum Inquiry',
      'contact.form.subject.opt2':       'Activity Inquiry',
      'contact.form.subject.opt3':       'Faculty Inquiry',
      'contact.form.subject.opt4':       'Feedback',
      'contact.form.subject.opt5':       'Other',
      'contact.form.msg.label':          'Message',
      'contact.form.msg.placeholder':    'Write your message here...',
      'contact.form.submit':             'Send Message',
      'contact.form.sending':            'Sending...',
      'contact.form.validate':           'Please fill in all required fields.',
      'contact.form.success.msg':        'Message sent! We\'ll get back to you as soon as possible.',
      'contact.form.error.msg':          'Something went wrong. Please try again.',

      'pr.hero.eyebrow': 'Public Relations',
      'pr.hero.title': 'Public Relations',
      'pr.hero.sub':   'Activities and event calendar for the Technology Learning Group',
      'pr.sec.act.eyebrow': 'Activities',
      'pr.sec.cal.eyebrow': 'Calendar',

      'act.hero.eyebrow': 'Public Relations · PDS',
      'act.hero.title':   'Activity Promotion',
      'act.hero.sub':     'Activities and projects from the Technology Learning Group',
      'act.detail.published': 'Published on',
      'act.detail.dateRange': 'Start – end date',
      'act.detail.external': 'Learn more',
      'act.detail.notFound': 'Activity not found',

      'cal.hero.eyebrow': 'Public Relations · PDS',
      'cal.hero.title':   'Activity Calendar',
      'cal.hero.sub':     'Schedule of events managed and published via the Admin panel',
      'cal.days':         'Sun,Mon,Tue,Wed,Thu,Fri,Sat',
      'cal.prev':         'Previous month',
      'cal.next':         'Next month',
      'cal.selected':     'Events on selected day',
      'cal.monthEvents':  'Events this month',
      'cal.empty':        'No events on this day',
      'cal.monthEmpty':   'No events this month',
      'cal.more':         'View details',
      'cal.listTitle':    'Event List',
      'cal.listCat':      'Activity Calendar',
    }
  };

  /* ─────────────────────────────────────────
     CORE FUNCTIONS
  ───────────────────────────────────────── */
  const LANG_KEY = 'pds-lang';

  function getLang() {
    return localStorage.getItem(LANG_KEY) || 'th';
  }

  function applyLang(lang) {
    const dict = T[lang] || T['th'];

    /* 1. text content */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] === undefined) return;
      /* Preserve a trailing caret icon (dropdown toggles) instead of wiping it */
      var caret = el.querySelector(':scope > .nav-caret');
      if (caret) {
        var first = el.firstChild;
        if (first && first.nodeType === 3) first.nodeValue = dict[key];
        else el.insertBefore(document.createTextNode(dict[key]), el.firstChild);
      } else {
        el.textContent = dict[key];
      }
    });

    /* 2. innerHTML (for elements with <em> etc.) */
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    /* 3. placeholder attributes */
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) el.placeholder = dict[key];
    });

    /* 4. aria-label attributes */
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (dict[key] !== undefined) el.setAttribute('aria-label', dict[key]);
    });

    /* 5. lang buttons */
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var isActive = btn.textContent.trim().toUpperCase() === lang.toUpperCase();
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    /* 6. html[lang] attribute */
    document.documentElement.setAttribute('lang', lang === 'th' ? 'th' : 'en');

    /* 7. notify CMS renderers so dynamic (JS-built) content re-renders */
    document.dispatchEvent(new CustomEvent('pds:langchange', { detail: { lang: lang } }));
  }

  /* pick the right language value from a CMS object:
     returns obj[field+'_en'] when EN is active and present, else obj[field] */
  function pick(obj, field) {
    var lang = getLang();
    if (lang === 'en') {
      var en = obj[field + '_en'];
      if (en !== undefined && en !== null && en !== '') return en;
    }
    return obj[field] != null ? obj[field] : '';
  }

  function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    applyLang(lang);
  }

  /* ─────────────────────────────────────────
     INIT
  ───────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    /* wire up lang buttons */
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setLang(this.textContent.trim().toLowerCase());
      });
    });

    /* CMS label overrides before first paint */
    if (window.CMS && CMS.applyToI18n) CMS.applyToI18n();

    /* apply saved language */
    applyLang(getLang());
  });

  /* expose for external use if needed */
  window.i18n = { setLang: setLang, getLang: getLang, applyLang: applyLang, pick: pick, T: T };
})();
