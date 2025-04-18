import { useRef, useCallback } from 'react';

/**
 * Hook personnalisé pour implémenter l'infinite scroll
 * 
 * @param {Function} loadMore - Fonction appelée lorsque l'utilisateur atteint le bas de la page
 * @param {Boolean} hasMore - Indique s'il y a plus de données à charger
 * @param {Boolean} isLoading - Indique si un chargement est en cours
 * @returns {Function} - Fonction à attacher à l'élément de référence
 */
const useInfiniteScroll = (loadMore, hasMore, isLoading) => {
  // Référence à l'observateur d'intersection
  const observer = useRef();
  
  // Fonction de callback pour attacher l'observateur à l'élément de référence
  const lastElementRef = useCallback(node => {

    if (isLoading) return;
    

    if (observer.current) observer.current.disconnect();
    
    // Créer un nouvel observateur
    observer.current = new IntersectionObserver(entries => {
      // Si l'élément est visible et qu'il y a plus de données à charger
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    }, {
      rootMargin: '100px', 
      threshold: 0.1 
    });
    
    // Observer l'élément s'il existe
    if (node) observer.current.observe(node);
  }, [loadMore, hasMore, isLoading]);
  
  return lastElementRef;
};

export default useInfiniteScroll;