import './styles/main.css';
import { useEffect, useState } from 'react';
import logoImg from './assets/logo-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal' ;
import * as Dialog from '@radix-ui/react-dialog';


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('https://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt='' />

      <h1 className='text-6xl text-white '>
        Seu <span className='bg-nlw-gradient text-transparent bg-clip-text'></span>duo está aqui.</h1>

      <div className='grid grid-clos-6 gap-6 mt-6'>
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
             />
          )
        })}
        {/* <GameBanner bannerUrl='/game-1' title='League of Legends' adsCount={4} />
        <GameBanner bannerUrl='/game-2' title='Dota 2' adsCount={5}/>
        <GameBanner bannerUrl='/game-3' title='Counter Strike' adsCount={2}/>
        <GameBanner bannerUrl='/game-4' title='Apex Legends' adsCount={4}/>
        <GameBanner bannerUrl='/game-5' title='Fortnite' adsCount={3}/>
        <GameBanner bannerUrl='/game-6' title='World of Warcraft' adsCount={4} /> */}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal/>
      </Dialog.Root>

    </div>
  );
}
export default App
