import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../redux/slice/authSlice.jsx';
import Typewriter from 'typewriter-effect';
import QrCodeGif from '../../assets/images/qrScanGif.gif';
import LaptopWork from '../../assets/images/laptopwork.png';
import Graph from '../../assets/images/graph.png';
import Notepad from '../../assets/images/notepad.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
    AOS.init();
  }, []);

  return (
    <>
      <main>
        <section className="hero-section px-16 py-24 min-h-screen h-fit grid md:grid-cols-2">
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

          <div className="hidden md:block">
            <div className="relative">

              <img
                src={QrCodeGif}
                alt="qrcode"
                className="object-contain h-20 top-32 left-36 lg:left-44 lg:top-16 aspect-square absolute"
              />
              <img
                src={LaptopWork}
                alt="laptop"
                className="object-contain h-[40rem] aspect-square absolute lap"
              />
              <img
                src={Graph}
                alt="graph"
                className="object-contain top-44 left-0 h-36 aspect-square absolute"
              />
              <img
                src={Notepad}
                alt="notepad"
                className="object-contain h-24 lg:right-12 md:right-4 md:top-52 aspect-square absolute"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default IndexPage;
