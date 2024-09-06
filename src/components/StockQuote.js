import React, { useState, useEffect } from 'react';

function StockQuote() {
  const [isOpen, setIsOpen] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetch('https://rickandmortyapi.com/api/character?limit=5')
        .then(response => response.json())
        .then(data => {
          setCharacters(data.results);
          setIsLoading(false);
        })
        .catch(err => {
          setError('Error al cargar los personajes');
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  const openModal = () => {
    console.log('openModal triggered');
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);

  return (
    <div className="elias-widget" style={styles.container}>
      <button onClick={openModal}>Ver personajes de Rick and Morty</button>

      {isOpen && (
        <div style={styles.overlay}>
          <div style={styles.modalContent}>
            <h2>Personajes de Rick and Morty</h2>
            <button style={styles.closeButton} onClick={closeModal}>X</button>
            
            {isLoading ? (
              <p>Cargando personajes...</p>
            ) : error ? (
              <p style={styles.error}>{error}</p>
            ) : (
              <div style={styles.characterList}>
                {characters.map(character => (
                  <div key={character.id} style={styles.characterCard}>
                    <img src={character.image} alt={character.name} style={styles.characterImage} />
                    <h3>{character.name}</h3>
                    <p><strong>Especie:</strong> {character.species}</p>
                    <p><strong>Estado:</strong> {character.status}</p>
                  </div>
                ))}
              </div>
            )}
            <button style={styles.closeModalButton} onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    maxWidth: '500px',
    maxHeight: '80vh',
    overflowY: 'auto',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  characterList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '20px',
  },
  characterCard: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '10px',
    textAlign: 'center',
  },
  characterImage: {
    maxWidth: '100%',
    borderRadius: '50%',
  },
  error: {
    color: 'red',
  },
  closeModalButton: {
    display: 'block',
    width: '100%',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  closeModalButtonHover: {
    backgroundColor: '#e0e0e0',
  },
};

export default StockQuote;
