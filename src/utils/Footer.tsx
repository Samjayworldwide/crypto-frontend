import React from 'react'

const Footer = () => {

  return (
      <div className="relative mt-10 bg-slate-950 text-white px-16 py-5">
        {/* <img
            src="/footer-background.png"
            alt="Footer"
            className="w-full"
        /> */}
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-6 py-4 bg-gradient-to-t from-black via-transparent to-transparent">
          <div className="text-white flex items-center space-x-4">
            {/* <img
                src="path-to-your-logo.png"
                alt="Logo"
                className="w-8 h-8"
            /> */}
            <span className="text-lg font-semibold">DuskUI</span>
          </div>
          <div className="text-white flex space-x-4">
            <a href="/terms" className="hover:underline">Terms & Conditions</a>
          </div>
        </div>
      </div>
  );
}

export default Footer