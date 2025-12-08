import React, { useRef, useState, useEffect } from 'react';

export default function SleepSounds() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [isAudioReady, setIsAudioReady] = useState(false);

  // Используем более надежные источники звуков
  const sounds = {
    //rain: 'https://pixabay.com/sound-effects/calming-rain-257596/',
    //forest: 'https://pixabay.com/sound-effects/forest-bird-harmonies-258412/',
    //waves: 'https://pixabay.com/sound-effects/soothing-ocean-waves-372489/'
    rain: '/sounds/rain.mp3',
    forest: '/sounds/forest.mp3',
    waves: '/sounds/waves.mp3'

  };

  // Инициализируем аудио при загрузке компонента
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    
    // Разрешаем автовоспроизведение после взаимодействия пользователя
    const handleUserInteraction = () => {
      setIsAudioReady(true);
      // Проигрываем короткий беззвучный звук для активации аудио контекста
      const silentAudio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQ=');
      silentAudio.play().then(() => {
        silentAudio.pause();
        silentAudio.remove();
      }).catch(console.log);
      
      document.removeEventListener('click', handleUserInteraction);
    };
    
    document.addEventListener('click', handleUserInteraction);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  const playSound = async (soundName) => {
    if (!isAudioReady) {
      alert('Пожалуйста, кликните в любое место страницы для активации звуков');
      return;
    }

    try {
      // Останавливаем текущий звук
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Если пытаемся воспроизвести тот же звук - останавливаем
      if (currentSound === soundName && isPlaying) {
        stopSound();
        return;
      }

      console.log('Playing:', sounds[soundName]);
      
      // Устанавливаем новый источник
      audioRef.current.src = sounds[soundName];
      
      // Ждем, пока аудио загрузится
      await new Promise((resolve, reject) => {
        audioRef.current.oncanplaythrough = resolve;
        audioRef.current.onerror = reject;
        // Таймаут на случай, если загрузка зависнет
        setTimeout(() => reject(new Error('Timeout loading audio')), 5000);
      });

      // Воспроизводим
      await audioRef.current.play();
      
      setCurrentSound(soundName);
      setIsPlaying(true);
      
    } catch (error) {
      console.error('Error playing sound:', error);
      
      if (error.name === 'NotAllowedError') {
        alert('Браузер заблокировал воспроизведение звука. Разрешите автовоспроизведение в настройках браузера.');
      } else if (error.message.includes('Timeout')) {
        alert('Звук слишком долго загружается. Проверьте интернет-соединение.');
      } else {
        alert(`Не удалось загрузить звук: ${error.message}`);
      }
      
      setIsPlaying(false);
      setCurrentSound(null);
    }
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentSound(null);
  };

  return (
    <div className="card">
      <h4>💤 Sleep Sounds</h4>
      
      {!isAudioReady && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#fff3cd', 
          borderRadius: '5px',
          marginBottom: '10px',
          fontSize: '12px'
        }}>
          🔔 Кликните в любое место страницы для активации звуков
        </div>
      )}
      
      <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
        <button 
          className="small" 
          onClick={() => playSound('rain')}
          disabled={!isAudioReady}
          style={{ 
            backgroundColor: currentSound === 'rain' ? '#4CAF50' : '',
            color: currentSound === 'rain' ? 'white' : '',
            opacity: isAudioReady ? 1 : 0.5
          }}
        >
          🌧️ Rain
        </button>
        
        <button 
          className="small" 
          onClick={() => playSound('forest')}
          disabled={!isAudioReady}
          style={{ 
            backgroundColor: currentSound === 'forest' ? '#4CAF50' : '',
            color: currentSound === 'forest' ? 'white' : '',
            opacity: isAudioReady ? 1 : 0.5
          }}
        >
          🌲 Forest
        </button>
        
        <button 
          className="small" 
          onClick={() => playSound('waves')}
          disabled={!isAudioReady}
          style={{ 
            backgroundColor: currentSound === 'waves' ? '#4CAF50' : '',
            color: currentSound === 'waves' ? 'white' : '',
            opacity: isAudioReady ? 1 : 0.5
          }}
        >
          🌊 Waves
        </button>
        
        <button 
          className="small" 
          onClick={stopSound}
          disabled={!isPlaying}
          style={{ 
            backgroundColor: '#ff4444',
            color: 'white',
            opacity: isPlaying ? 1 : 0.5
          }}
        >
          ⏹️ Stop
        </button>
      </div>

      {isPlaying && (
        <p style={{ fontSize: '12px', marginTop: '8px', color: '#4CAF50' }}>
          ▶️ Playing: {currentSound}
        </p>
      )}
    </div>
  );
}