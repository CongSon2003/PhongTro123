/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}","./public/index.html"],
  theme: {
    extend: {
      width :{
        '1100' : '1100px',
      },
      text:{
        secondary1  : "#fff"
      },
      maxWidth:{
        '1100' : '1100px'
      },
      backgroundColor:{
        primary : '#f5f5f5',
        secondary1 : '#1266dd',
        secondary2 : '#f73859',
        secondary3 : '#febb02',
        'overlay-05' : 'rgba(0,0,0,0.5)',
      },
      backgroundImage:{
        HCM : "url('../../client/public/location_hcm.jpg')",
        HN : "url('../../client/public/location_hn.jpg')",
        DN : "url('../../client/public/location_dn.jpg')",
        UPLOAD_IMG : "url('../../client/public/upload-image.png')",
        UPLOAD_VIDEO : "url('../../client/public/upload-image.png')",
        NOHEARTFILL : "url('../../client/public/love.png')",
        HEARTFILL : "url('https://phongtro123.com/images/love-full-2.svg')",
        SUPPORT_IMAGE : "url('../../client/public/support-bg.jpg')",
        facebook : "url('https://phongtro123.com/images/icon_facebook.svg')",
        youtobe : "url('https://phongtro123.com/images/icon_youtube.svg')",
        zalo : "url('https://phongtro123.com/images/icon_zalo.svg')",
        twitter : "url('https://phongtro123.com/images/icon_twitter.svg')",
        cash : "url('../../client/public/cash.png')",
        banking : "url('../../client/public/banking.png')",
        mastercard : "url('../../client/public/mastercard.png')",
        map : "url('../../client/public/Google-Maps-Traffic2.jpg')",
        jcb : "url('../../client/public/jcb.png')",
        momo : "url('../../client/public/momo.png')",
        visa : "url('../../client/public/visa.png')",
        bds : "url('https://phongtro123.com/images/logo-bds123.svg')",
        ctn : "url('https://phongtro123.com/images/logo-chothuenha.svg')",
        tch : "url('https://phongtro123.com/images/logo-thuecanho.svg')",
        pt123 : "url('https://phongtro123.com/images/logo-phongtro.svg')",
        qrPT : "url('../../client/public/qrPhongtron123.png')"
      },
      flex : {
        '3' : '3 3 0%'
      }
    },
  },
  plugins: [],
}