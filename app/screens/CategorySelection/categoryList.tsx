import { EmissionType } from "interfaces";

const categories = [
  {  
    icon: '',
    emissionType: EmissionType.meal,
    iscustomImge:require('../../../assets/images/branInjuri.png')
  }, 
  {
    icon: "airplane",
    emissionType: EmissionType.transport,
    iscustomImge:false
  },
  {
    icon: "", 
    emissionType: EmissionType.productScanned,
    iscustomImge:require('../../../assets/images/medicalCard.png')
  },
  {
    icon: "play-circle",
    emissionType: EmissionType.streaming,
    iscustomImge:false
  },
  {
    icon: "card",
    emissionType: EmissionType.purchase,
    iscustomImge:false
  },
  {
    icon: "",
    emissionType: EmissionType.fashion,
    iscustomImge:require('../../../assets/images/Wearable.png') 
   },
  {
    icon: "",
    emissionType: EmissionType.food,
    iscustomImge:require('../../../assets/images/mri.png') 
  },
  {
    icon: "",
    emissionType: EmissionType.electricity,
    iscustomImge:require('../../../assets/images/ct.png') 
  },
  {
    icon: "build",
    emissionType: EmissionType.custom,
    iscustomImge:false
  },
];

export { categories };
