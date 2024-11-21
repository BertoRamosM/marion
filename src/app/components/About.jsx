import React from 'react'
import Image from 'next/image'

const About = () => {
  return (
    <div className='flex items-center justify-center pt-16 gap-4 border-2 relative'>
        <div className="max-w-[600px] bg-black opacity-50 p-8 rounded-lg text-white absolute left-80 z-10">
            <h1>Moi, Marion </h1>
            <p>et je suis prof de français à Rennes. Comme toi, je suis une expat’! J’ai vécu longtemps en dehors de mon pays, en Angleterre, en Espagne et au Mexique. 
            Aujourd’hui je suis de retour en Bretagne et je te propose des cours spécialement pensés pour toi.</p>
        </div>
        <div className="">
            <Image src="/about/Marion.jpg" alt="Marion" width={400} height={400} className='rounded-lg' />
        </div>
    </div>
  )
}

export default About