import { useNavigate } from 'react-router-dom'

export default function Test() {
  const nav = useNavigate()
  return (
    <div>
      <audio controls className='block' preload=''>
        <source src="https://rr3---sn-hgn7rn7y.googlevideo.com/videoplayback?expire=1709776234&ei=CsnoZc_pHojFzLUPv5qQkAY&ip=5.182.110.238&id=o-APSGwUaFMyUoKf1RpdC_bZTAGYww2BObnt52_mf3sHO-&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&spc=UWF9fw9RoYUSBGoxLmXloI2-wh0vifF5VIjMW5O4hU-MoAg&vprv=1&svpuc=1&mime=video%2Fmp4&gir=yes&clen=69118046&ratebypass=yes&dur=1077.150&lmt=1709742351588146&fexp=24007246,24350322&beids=24350322&c=ANDROID&txp=3309224&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIhAJflKQGPT9Blbz4apQ8AxJ5xUpLvjEF1wMya0g3kT4XBAiB1nYC3dfI-rUW6214-MgaCaa3lxO50sTKPL8kZoYL4QQ%3D%3D&title=The%20Most%20Satisfying%20Thing%20You%27ll%20See%20All%20Week!%20Ft.Jankos%20%7C%20Spear%20Shot&rm=sn-q4fesd7e&req_id=e636a87c57caa3ee&redirect_counter=2&cm2rm=sn-uxaxjvhxbt2u-j5plk7e&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=fa&mip=154.176.136.10&mm=29&mn=sn-hgn7rn7y&ms=rdu&mt=1709754289&mv=m&mvi=3&pl=23&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=APTiJQcwRgIhALPRdmepDs8lLD3ZZlyNug28grbHMzjPuIaYyys5EVoZAiEA2IJvpCxNLBunb3264KodH9iHBdSYGSl4sgWY0K1GhB4%3D" type='audio/webm' />
      </audio>
      <div className='w-16 h-16 flex justify-center items-center bg-green-500 cursor-pointer' onClick={() => {nav(-1)}}> back </div>
    </div>
  )
}
