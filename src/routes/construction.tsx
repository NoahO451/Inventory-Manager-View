import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/construction")({

  component: () => {
    const hazardBorder = {
      border: '20px solid pink',
      borderImage: 'repeating-linear-gradient(-55deg, #000, #000 20px, #ffb101 20px, #ffb101 40px) 10',
    };
    
    return (
      <>
        <div style={hazardBorder}>
            <div className="flex flex-col justify-center items-center w-full h-screen bg-[#F9C900] pb-32">
              <h1 className="font-bold text-4xl mb-16">
                This page is under construction
              </h1>
              <img src="/public/resetti.png" alt="" />
            </div>
        </div>
      </>
    );
  }
});