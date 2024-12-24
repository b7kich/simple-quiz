import { Subject } from './components/Subject/Subject'

const challenges = () => {
  return 'spring,summer,fall,winter'.split(',').map((v,i) => { return {'id':i,'data':{'prompt':'_','solution':v}} }) as any
}

function App() {
  return (
    <Subject 
      id="1" 
      title="The Seasons" 
      intro='
      <p>Name the seasons in appearance during the year.
      </p>
      <iframe src="https://www.youtube-nocookie.com/embed/NavWWM2iTEw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
      challenges={challenges()}
    />
  );
}

export default App;
