import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/slice/authSlice.jsx';
import Typewriter from 'typewriter-effect';
import QrCodeGif from '../../assets/images/qrScanGif.gif';
import LaptopWork from '../../assets/images/laptopwork.png';
import Graph from '../../assets/images/graph.png';
import Notepad from '../../assets/images/notepad.png';
import LinkedinLogo from '../../assets/images/linkedin3Dlogo.png';
import GithubLogo from '../../assets/images/github3Dlogo.png';
import GmailLogo from '../../assets/images/gmail3Dlogo.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FeatureCard from './FeatureCard.jsx';
import FeatureInfo from './FeatureInfo.js';
import { FirebaseIcon, ReactIcon, ReduxToolkitIcon } from '../../assets/SVG.jsx';

const IndexPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state=>{return state.auth.user})
  const handleClick = () => {
    if(user){
      navigate('/hero');
      return;
    }

    dispatch(login(navigate));
  }

  useEffect(() => {
    AOS.init({delay: 300});
  }, []);

  return (
    <>
      <main>
        <section className="hero-section px-16 py-24 min-h-screen h-max grid md:grid-cols-2">
          <div className="flex flex-col justify-center gap-6">
            <h1 className="text-5xl font-semibold" data-aos="fade-up-right">
              <Typewriter
                options={{
                  strings: ['Automize', 'Streamline', 'Analyze', 'Optimize'],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
            <h3
              className="text-xl md:text-3xl xl:text-4xl text-primary"
              data-aos="fade-down-left"
            >
              The Ultimate App to Automate Your Store Management
            </h3>

            <button className="text-xl fill" data-aos="zoom-in" onClick={handleClick}>
              Get started
            </button>
          </div>

          <div className="md:block">
            <div className="relative" data-aos="zoom-in">

              <img
                src={QrCodeGif}
                alt="qrcode"
                data-aos="zoom-in"
                className="animate animate2 object-contain h-20 top-32 left-36 lg:left-64 lg:top-12 aspect-square absolute"
              />
              <img
                src={LaptopWork}
                alt="laptop"
                className="object-contain h-[40rem] absolute"
              />
              <img
                src={Graph}
                alt="graph"
                className="animate object-contain top-24 left-0 h-36 aspect-square absolute"
              />
              <img
                src={Notepad}
                alt="notepad"

                className="animate animate1 object-contain h-24 lg:right-12 md:right-4 md:top-28 aspect-square absolute"
              />
            </div>
          </div>
        </section>
        <section className='min-h-screen'> 
          <div className="text-center" data-aos="zoom-in">
          <h2 className='text-primary text-xl font-medium'>WHY STOCKMATE ?</h2>
          <p className='font-semibold text-3xl py-2'>Make inventory management easier <br /> and more convinient for you .</p>
          </div>
          <div className='pt-4 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 '>
                {
                  FeatureInfo.map(feature=>{
                    const {id, heading, icon, body, borderColor, aos} = feature;
                    return <FeatureCard key={id} heading={heading} icon={icon} body={body} borderColor={borderColor} aos={aos} />
                  })
                }
          </div>
        </section>
        <section className='bg-white'>
          <h2 className='font-semibold text-3xl pb-8 text-center'>Tech Stack Used</h2>
          <div className='flex justify-between shrink-0'>
            <div data-aos="fade-right">
            {ReactIcon} 
            <h3 className='text-primary text-xl font-medium text-center p-2'>React Js</h3>
            </div>
            <div data-aos="zoom-in">
            {FirebaseIcon}
            <h3 className='text-primary text-xl font-medium text-center p-2' >Firebase</h3>
            </div>
            <div data-aos="fade-left">
            {ReduxToolkitIcon}
            <h3 className='text-primary text-xl font-medium text-center p-2'>Redux Toolkit</h3>
            </div>
          </div>
        </section>
      </main>

      <footer className='py-8 px-16 bg-primary grid md:grid-cols-2 md:h-72'>
          <div className="flex flex-col justify-center gap-2 border-r-4 border-white" data-aos="fade-down-right">
                <h3 className='text-2xl text-white'>Created by</h3>
                <h2 className='text-5xl font-medium'>Abhinav Srivastava</h2>
          </div>

          <div className='px-16' data-aos="fade-down-left">
            <h3 className='text-2xl text-white'>Connect with me</h3>
            <div className='flex gap-12 mt-12'>
              <a href="https://www.linkedin.com/in/abhinav1312">
                <img className='aspect-square w-24 object-contain hover:scale-110' src={LinkedinLogo} alt="linkedin" />
              </a>
              <a href="https://www.github.com/abhinav1312">
                <img className='aspect-square w-24 object-contain hover:scale-110' src={GithubLogo} alt="github" />
              </a>
              <a href="abhinav0427@gmail.com">
                <img className='aspect-square w-24 object-contain hover:scale-110' src={GmailLogo} alt="gmail" />
              </a>
            </div>
          </div>
      </footer>
    </>
  );
};

export default IndexPage;
