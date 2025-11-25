import Img1 from '../../../assets/fotos/Img1.png';
import Img2 from '../../../assets/fotos/Img2.png';
import Img3 from '../../../assets/fotos/Img3.png';
import Img4 from '../../../assets/fotos/Img4.png';
import Img5 from '../../../assets/fotos/Img5.png';
import Img6 from '../../../assets/fotos/Img6.png';
import Img7 from '../../../assets/fotos/Img7.png';
import Img8 from '../../../assets/fotos/Img8.png';
import Img9 from '../../../assets/fotos/Img9.png';
import Img10 from '../../../assets/fotos/Img10.png';
import Img11 from '../../../assets/fotos/Img11.png';
import Img12 from '../../../assets/fotos/Img12.png';
import db from '../../../../db.json';

const images = {
  'Img1.png': Img1,
  'Img2.png': Img2,
  'Img3.png': Img3,
  'Img4.png': Img4,
  'Img5.png': Img5,
  'Img6.png': Img6,
  'Img7.png': Img7,
  'Img8.png': Img8,
  'Img9.png': Img9,
  'Img10.png': Img10,
  'Img11.png': Img11,
  'Img12.png': Img12,
};

const baseFotos = (Array.isArray(db.fotos) ? db.fotos : []).map(foto => {
  const fileName = typeof foto.src === 'string' ? foto.src.split('/').pop() : null;
  return {
    ...foto,
    src: (fileName && images[fileName]) ? images[fileName] : foto.src,
  };
});

const savedFotos = (() => {
  try {
    const raw = localStorage.getItem('petgram_fotos');
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.map(f => ({ ...f })) : [];
  } catch {
    return [];
  }
})();

const FeedData = [
  ...savedFotos,
  ...baseFotos.filter(f => !savedFotos.find(sf => sf.id === f.id))
];

export default FeedData;
