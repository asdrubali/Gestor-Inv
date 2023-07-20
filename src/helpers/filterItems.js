


export const filterItems = (title = '', selectedValue = '', _data = []) => {

    if (title.trim().toLocaleLowerCase() === 'vencidos') {
      switch (selectedValue.trim().toLowerCase()) {
        case 'vencidos':
          return _data.filter((item) => item.fecha_vencimiento <= new Date());
        case 'por vencer':
          return _data.filter((item) => item.fecha_vencimiento >= new Date());
        default:
          return _data;
      }
    } else if (title.trim().toLocaleLowerCase() === 'inactivos') {


      switch (selectedValue.trim().toLowerCase()) {
        case 'inactivos':
          return _data.filter(({status}) => status.trim().toLocaleLowerCase() === 'inactivo');
        case 'no disponibles':
          return _data.filter(({status}) => status.trim().toLocaleLowerCase() === 'no disponible');
        case 'descontinuados':
          return _data.filter(({status}) => status.trim().toLocaleLowerCase() === 'descontinuado');
        default:
          return _data;
      }
    } else {

      return _data;
    }
  };
  