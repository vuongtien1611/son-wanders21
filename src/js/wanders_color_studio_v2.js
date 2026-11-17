/**
 * WANDERS COLOR STUDIO V2 — ARCHITECTURAL COLOR SYSTEM
 * Built for WANDERS Luxury Paint & Color City Pro Master Palette
 * 1.002 Unique Architectural Colors | 8 Categories + Tất cả
 * Desktop Independent Swatch Scroll & Hand-off | Mobile 12-Card Pagination
 */

(function () {
  'use strict';

  // --- 1. DATA DEFINITIONS ---
  const CATEGORIES = [
  {
    "id": "all",
    "name": "Tất cả",
    "count": 1002
  },
  {
    "id": "pastel",
    "name": "Pastel",
    "fullName": "Pastel",
    "count": 154
  },
  {
    "id": "red",
    "name": "Đỏ",
    "fullName": "Red – Đỏ",
    "count": 227
  },
  {
    "id": "grey",
    "name": "Xám",
    "fullName": "Grey – Xám",
    "count": 152
  },
  {
    "id": "blue",
    "name": "Xanh dương",
    "fullName": "Blue – Xanh dương",
    "count": 176
  },
  {
    "id": "brown",
    "name": "Nâu",
    "fullName": "Brown – Nâu",
    "count": 160
  },
  {
    "id": "yellow",
    "name": "Vàng",
    "fullName": "Yellow – Vàng",
    "count": 120
  },
  {
    "id": "green",
    "name": "Xanh lá",
    "fullName": "Green – Xanh lá",
    "count": 160
  },
  {
    "id": "purple",
    "name": "Tím",
    "fullName": "Purple – Tím",
    "count": 88
  }
];

  // Raw items array (1.237 rows)
  const RAW_ITEMS_DATA = [{"c":"white-1","h":"#ffffff","g":"pastel","n":"Pastel","s":"light","b":"high","t":"neutral","l":255},{"c":"white-2","h":"#f5f5f5","g":"pastel","n":"Pastel","s":"light","b":"high","t":"neutral","l":245},{"c":"1340","h":"#ebdfc7","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":224},{"c":"1460","h":"#e3d4ba","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":214},{"c":"1510","h":"#f1e6d2","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":231},{"c":"1580","h":"#eedfc3","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":224},{"c":"1100","h":"#f6eedd","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":238},{"c":"1390","h":"#f8eddd","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":238},{"c":"1280","h":"#ebdeca","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":224},{"c":"1160","h":"#fbf0d7","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":240},{"c":"1380","h":"#f9ecdc","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":238},{"c":"1080","h":"#f8f1e4","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":242},{"c":"1140","h":"#fae7d9","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":235},{"c":"1150","h":"#f5ebdb","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":236},{"c":"1310","h":"#eee4d7","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":230},{"c":"1550","h":"#f5eddd","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":238},{"c":"1560","h":"#eee1d1","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":227},{"c":"1450","h":"#f9ebda","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":237},{"c":"1170","h":"#f7f0e1","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":240},{"c":"1130","h":"#f4eee3","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":239},{"c":"1190","h":"#f2e8e1","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":234},{"c":"1500","h":"#f6efe4","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":240},{"c":"1000","h":"#f3f1e2","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":240},{"c":"1180","h":"#eef2e1","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":239},{"c":"1120","h":"#ebf3df","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":238},{"c":"1360","h":"#eef1e5","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":239},{"c":"2001-P","h":"#f6dbe1","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":228},{"c":"2041-P","h":"#f5e7e7","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":235},{"c":"2071-P","h":"#f6e3e4","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":233},{"c":"2101-P","h":"#feebe4","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":240},{"c":"2111-P","h":"#f9e4e2","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":234},{"c":"2141-P","h":"#f7e7e2","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":235},{"c":"2151-P","h":"#fce3da","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":233},{"c":"2161-P","h":"#fce8dc","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":237},{"c":"2181-P","h":"#fbebde","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":238},{"c":"2211-P","h":"#fbe1cd","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":230},{"c":"2201-P","h":"#f9e6d8","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":234},{"c":"2221-P","h":"#fdedde","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":240},{"c":"2241-P","h":"#f9e4cb","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":231},{"c":"2251-P","h":"#f9ddce","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":228},{"c":"2191-P","h":"#fae0ca","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":229},{"c":"3181-P","h":"#f7e5da","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":233},{"c":"2261-P","h":"#fae6d2","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":234},{"c":"2271-P","h":"#fbe8d0","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":235},{"c":"2281-P","h":"#f2d4b7","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":218},{"c":"2291-P","h":"#f7e4ce","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":231},{"c":"2311-P","h":"#fbefd9","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":240},{"c":"2321-P","h":"#fdead1","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":237},{"c":"2351-P","h":"#faeddd","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":239},{"c":"2361-P","h":"#fbefd7","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":240},{"c":"2371-P","h":"#fbe8c6","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":234},{"c":"2381-P","h":"#fbefd9","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":240},{"c":"2391-P","h":"#fbefd3","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":239},{"c":"2401-P","h":"#f8eed9","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":239},{"c":"2421-P","h":"#fbf3db","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":243},{"c":"2441-P","h":"#faf1d6","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":241},{"c":"2461-P","h":"#faecce","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":237},{"c":"2481-P","h":"#f8f0d4","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":239},{"c":"2491-P","h":"#faf0d2","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":240},{"c":"2501-P","h":"#faf4de","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":243},{"c":"2511-P","h":"#f8f1d7","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":240},{"c":"2531-P","h":"#f6edce","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":236},{"c":"3421-P","h":"#f8f2dd","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":241},{"c":"2561-P","h":"#f3f2d5","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":239},{"c":"2591-P","h":"#eaebca","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":231},{"c":"2601-P","h":"#ecf0d2","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":235},{"c":"2621-P","h":"#e4efcc","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":232},{"c":"2631-P","h":"#e8eed4","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":233},{"c":"2641-P","h":"#e6eed9","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":233},{"c":"2651-P","h":"#dee8d9","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":227},{"c":"2681-P","h":"#eaf3df","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":238},{"c":"2701-P","h":"#e7f0e2","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":236},{"c":"2711-P","h":"#e7efe4","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":235},{"c":"2731-P","h":"#e8f2e6","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":238},{"c":"2741-P","h":"#dcf1e1","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":233},{"c":"2751-P","h":"#e7eee2","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":235},{"c":"2761-P","h":"#e4f0e5","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":235},{"c":"2771-P","h":"#daeee4","g":"pastel","n":"Pastel","s":"light","b":"high","t":"cool","l":231},{"c":"2781-P","h":"#e6f0e1","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":235},{"c":"2791-P","h":"#e6f0e7","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":236},{"c":"2801-P","h":"#d5ecde","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":228},{"c":"2821-P","h":"#e3f0e7","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":235},{"c":"2831-P","h":"#e1f0e7","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":234},{"c":"2841-P","h":"#e8f2e7","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":238},{"c":"2851-P","h":"#e0ede6","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":232},{"c":"2861-P","h":"#e8f0e8","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":237},{"c":"2881-P","h":"#deeeeb","g":"pastel","n":"Pastel","s":"light","b":"high","t":"cool","l":233},{"c":"2911-P","h":"#e4eae8","g":"pastel","n":"Pastel","s":"light","b":"high","t":"neutral","l":232},{"c":"2931-P","h":"#e8ede8","g":"pastel","n":"Pastel","s":"light","b":"high","t":"neutral","l":235},{"c":"2961-P","h":"#e4ebe9","g":"pastel","n":"Pastel","s":"light","b":"high","t":"cool","l":233},{"c":"3561-P","h":"#e9eae4","g":"pastel","n":"Pastel","s":"light","b":"high","t":"neutral","l":233},{"c":"3581-P","h":"#e7e8e5","g":"pastel","n":"Pastel","s":"light","b":"high","t":"neutral","l":231},{"c":"3541-P","h":"#e2e5e0","g":"pastel","n":"Pastel","s":"light","b":"high","t":"neutral","l":228},{"c":"3011-P","h":"#e6e3e2","g":"pastel","n":"Pastel","s":"light","b":"high","t":"neutral","l":228},{"c":"2991-P","h":"#e6e7e5","g":"pastel","n":"Pastel","s":"light","b":"high","t":"neutral","l":230},{"c":"3021-P","h":"#e5e7e9","g":"pastel","n":"Pastel","s":"light","b":"high","t":"neutral","l":231},{"c":"3051-P","h":"#e4dfe6","g":"pastel","n":"Pastel","s":"light","b":"high","t":"neutral","l":225},{"c":"3061-P","h":"#ded9e2","g":"pastel","n":"Pastel","s":"light","b":"high","t":"cool","l":220},{"c":"3081-P","h":"#e9dde5","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":226},{"c":"3101-P","h":"#f3e1e6","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":231},{"c":"3091-P","h":"#ebdde4","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":226},{"c":"3121-P","h":"#f4e5e5","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":233},{"c":"2031-P","h":"#f5e0e0","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":230},{"c":"3141-P","h":"#f5e3e0","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":232},{"c":"3161-P","h":"#efddd6","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":226},{"c":"3211-P","h":"#f5e4dd","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":232},{"c":"3221-P","h":"#f1e1d7","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":229},{"c":"3201-P","h":"#f9ebe0","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":238},{"c":"3191-P","h":"#f3e2d6","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":230},{"c":"3231-P","h":"#ebdad1","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":222},{"c":"3241-P","h":"#e5d6cc","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":217},{"c":"3301-P","h":"#f3e6d8","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":232},{"c":"3331-P","h":"#e2d5c9","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":216},{"c":"3311-P","h":"#f5ece1","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":237},{"c":"3321-P","h":"#f4eadd","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":236},{"c":"3291-P","h":"#f2eadf","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":235},{"c":"3281-P","h":"#e8dfd2","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":224},{"c":"3271-P","h":"#f7f1e4","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":241},{"c":"3351-P","h":"#e8d9c4","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":219},{"c":"3341-P","h":"#efe2cf","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":228},{"c":"3361-P","h":"#e9dec9","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":223},{"c":"3371-P","h":"#f5ecd8","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":236},{"c":"3381-P","h":"#f6eddb","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":238},{"c":"3391-P","h":"#f3e8d5","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":233},{"c":"3401-P","h":"#f0e6d0","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":230},{"c":"3411-P","h":"#ebe7c9","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":229},{"c":"3431-P","h":"#f4edd4","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":236},{"c":"3441-P","h":"#f5eed3","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":237},{"c":"3451-P","h":"#eee7d1","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":231},{"c":"3461-P","h":"#f2ebd3","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":234},{"c":"3471-P","h":"#e8e6d0","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":228},{"c":"3481-P","h":"#eaead6","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":232},{"c":"3491-P","h":"#e7e7d5","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":229},{"c":"3501-P","h":"#e7e7d5","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":229},{"c":"3511-P","h":"#d9ddcc","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":218},{"c":"3521-P","h":"#dbdfd3","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":220},{"c":"3551-P","h":"#e3e8e3","g":"pastel","n":"Pastel","s":"light","b":"high","t":"neutral","l":230},{"c":"3531-P","h":"#d7d5cd","g":"pastel","n":"Pastel","s":"light","b":"high","t":"neutral","l":213},{"c":"3591-P","h":"#ebe8e3","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":232},{"c":"3601-P","h":"#e1dcd4","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":221},{"c":"3611-P","h":"#e7e3dc","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":227},{"c":"3621-P","h":"#eae7df","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":231},{"c":"3631-P","h":"#ded7d4","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":217},{"c":"3261-P","h":"#dcdad4","g":"pastel","n":"Pastel","s":"light","b":"high","t":"neutral","l":218},{"c":"3251-P","h":"#dbd8d1","g":"pastel","n":"Pastel","s":"light","b":"high","t":"neutral","l":216},{"c":"3641-P","h":"#e3dcda","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":222},{"c":"3661-P","h":"#e6e0e2","g":"pastel","n":"Pastel","s":"light","b":"high","t":"neutral","l":226},{"c":"3671-P","h":"#e7ddde","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":224},{"c":"2002-P","h":"#f6d2e1","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":222},{"c":"2042-P","h":"#ebc1d2","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":207},{"c":"2072-P","h":"#f5b7c7","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":203},{"c":"2102-P","h":"#fbc2c5","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":211},{"c":"2112-P","h":"#f5bbc5","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":205},{"c":"2142-P","h":"#f6caca","g":"pastel","n":"Pastel","s":"light","b":"high","t":"warm","l":215},{"c":"2001-P","h":"#f6dbe1","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":228},{"c":"2041-P","h":"#f5e7e7","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":235},{"c":"2071-P","h":"#f6e3e4","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":233},{"c":"2101-P","h":"#feebe4","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":240},{"c":"2111-P","h":"#f9e4e2","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":234},{"c":"2141-P","h":"#f7e7e2","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":235},{"c":"2151-P","h":"#fce3da","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":233},{"c":"2161-P","h":"#fce8dc","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":237},{"c":"2181-P","h":"#fbebde","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":238},{"c":"2211-P","h":"#fbe1cd","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":230},{"c":"2201-P","h":"#f9e6d8","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":234},{"c":"2221-P","h":"#fdedde","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":240},{"c":"2241-P","h":"#f9e4cb","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":231},{"c":"2251-P","h":"#f9ddce","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":228},{"c":"2191-P","h":"#fae0ca","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":229},{"c":"3181-P","h":"#f7e5da","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":233},{"c":"2261-P","h":"#fae6d2","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":234},{"c":"2271-P","h":"#fbe8d0","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":235},{"c":"2281-P","h":"#f2d4b7","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":218},{"c":"2291-P","h":"#f7e4ce","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":231},{"c":"2311-P","h":"#fbefd9","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":240},{"c":"2321-P","h":"#fdead1","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":237},{"c":"2351-P","h":"#faeddd","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":239},{"c":"2361-P","h":"#fbefd7","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":240},{"c":"2371-P","h":"#fbe8c6","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":234},{"c":"2381-P","h":"#fbefd9","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":240},{"c":"2391-P","h":"#fbefd3","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":239},{"c":"2401-P","h":"#f8eed9","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":239},{"c":"2421-P","h":"#fbf3db","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":243},{"c":"2441-P","h":"#faf1d6","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":241},{"c":"2461-P","h":"#faecce","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":237},{"c":"2481-P","h":"#f8f0d4","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":239},{"c":"2491-P","h":"#faf0d2","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":240},{"c":"2501-P","h":"#faf4de","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":243},{"c":"2511-P","h":"#f8f1d7","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":240},{"c":"2531-P","h":"#f6edce","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":236},{"c":"3421-P","h":"#f8f2dd","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":241},{"c":"2561-P","h":"#f3f2d5","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":239},{"c":"2591-P","h":"#eaebca","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":231},{"c":"2601-P","h":"#ecf0d2","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":235},{"c":"2621-P","h":"#e4efcc","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":232},{"c":"2631-P","h":"#e8eed4","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":233},{"c":"2641-P","h":"#e6eed9","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":233},{"c":"2651-P","h":"#dee8d9","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":227},{"c":"2681-P","h":"#eaf3df","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":238},{"c":"2701-P","h":"#e7f0e2","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":236},{"c":"2711-P","h":"#e7efe4","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":235},{"c":"2731-P","h":"#e8f2e6","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":238},{"c":"2741-P","h":"#dcf1e1","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":233},{"c":"2751-P","h":"#e7eee2","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":235},{"c":"2761-P","h":"#e4f0e5","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":235},{"c":"2771-P","h":"#daeee4","g":"red","n":"Đỏ","s":"light","b":"high","t":"cool","l":231},{"c":"2781-P","h":"#e6f0e1","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":235},{"c":"2791-P","h":"#e6f0e7","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":236},{"c":"2801-P","h":"#d5ecde","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":228},{"c":"2821-P","h":"#e3f0e7","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":235},{"c":"2831-P","h":"#e1f0e7","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":234},{"c":"2841-P","h":"#e8f2e7","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":238},{"c":"2851-P","h":"#e0ede6","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":232},{"c":"2861-P","h":"#e8f0e8","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":237},{"c":"2881-P","h":"#deeeeb","g":"red","n":"Đỏ","s":"light","b":"high","t":"cool","l":233},{"c":"2911-P","h":"#e4eae8","g":"red","n":"Đỏ","s":"light","b":"high","t":"neutral","l":232},{"c":"2931-P","h":"#e8ede8","g":"red","n":"Đỏ","s":"light","b":"high","t":"neutral","l":235},{"c":"2961-P","h":"#e4ebe9","g":"red","n":"Đỏ","s":"light","b":"high","t":"cool","l":233},{"c":"3561-P","h":"#e9eae4","g":"red","n":"Đỏ","s":"light","b":"high","t":"neutral","l":233},{"c":"3581-P","h":"#e7e8e5","g":"red","n":"Đỏ","s":"light","b":"high","t":"neutral","l":231},{"c":"3541-P","h":"#e2e5e0","g":"red","n":"Đỏ","s":"light","b":"high","t":"neutral","l":228},{"c":"3011-P","h":"#e6e3e2","g":"red","n":"Đỏ","s":"light","b":"high","t":"neutral","l":228},{"c":"2991-P","h":"#e6e7e5","g":"red","n":"Đỏ","s":"light","b":"high","t":"neutral","l":230},{"c":"3021-P","h":"#e5e7e9","g":"red","n":"Đỏ","s":"light","b":"high","t":"neutral","l":231},{"c":"3051-P","h":"#e4dfe6","g":"red","n":"Đỏ","s":"light","b":"high","t":"neutral","l":225},{"c":"3061-P","h":"#ded9e2","g":"red","n":"Đỏ","s":"light","b":"high","t":"cool","l":220},{"c":"3081-P","h":"#e9dde5","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":226},{"c":"3101-P","h":"#f3e1e6","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":231},{"c":"3091-P","h":"#ebdde4","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":226},{"c":"3121-P","h":"#f4e5e5","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":233},{"c":"2031-P","h":"#f5e0e0","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":230},{"c":"3141-P","h":"#f5e3e0","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":232},{"c":"3161-P","h":"#efddd6","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":226},{"c":"3211-P","h":"#f5e4dd","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":232},{"c":"3221-P","h":"#f1e1d7","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":229},{"c":"3201-P","h":"#f9ebe0","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":238},{"c":"3191-P","h":"#f3e2d6","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":230},{"c":"3231-P","h":"#ebdad1","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":222},{"c":"3241-P","h":"#e5d6cc","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":217},{"c":"3301-P","h":"#f3e6d8","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":232},{"c":"3331-P","h":"#e2d5c9","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":216},{"c":"3311-P","h":"#f5ece1","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":237},{"c":"3321-P","h":"#f4eadd","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":236},{"c":"3291-P","h":"#f2eadf","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":235},{"c":"3281-P","h":"#e8dfd2","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":224},{"c":"3271-P","h":"#f7f1e4","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":241},{"c":"3351-P","h":"#e8d9c4","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":219},{"c":"3341-P","h":"#efe2cf","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":228},{"c":"3361-P","h":"#e9dec9","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":223},{"c":"3371-P","h":"#f5ecd8","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":236},{"c":"3381-P","h":"#f6eddb","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":238},{"c":"3391-P","h":"#f3e8d5","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":233},{"c":"3401-P","h":"#f0e6d0","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":230},{"c":"3411-P","h":"#ebe7c9","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":229},{"c":"3431-P","h":"#f4edd4","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":236},{"c":"3441-P","h":"#f5eed3","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":237},{"c":"3451-P","h":"#eee7d1","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":231},{"c":"3461-P","h":"#f2ebd3","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":234},{"c":"3471-P","h":"#e8e6d0","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":228},{"c":"3481-P","h":"#eaead6","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":232},{"c":"3491-P","h":"#e7e7d5","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":229},{"c":"3501-P","h":"#e7e7d5","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":229},{"c":"3511-P","h":"#d9ddcc","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":218},{"c":"3521-P","h":"#dbdfd3","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":220},{"c":"3551-P","h":"#e3e8e3","g":"red","n":"Đỏ","s":"light","b":"high","t":"neutral","l":230},{"c":"3531-P","h":"#d7d5cd","g":"red","n":"Đỏ","s":"light","b":"high","t":"neutral","l":213},{"c":"3591-P","h":"#ebe8e3","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":232},{"c":"3601-P","h":"#e1dcd4","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":221},{"c":"3611-P","h":"#e7e3dc","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":227},{"c":"3621-P","h":"#eae7df","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":231},{"c":"3631-P","h":"#ded7d4","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":217},{"c":"3261-P","h":"#dcdad4","g":"red","n":"Đỏ","s":"light","b":"high","t":"neutral","l":218},{"c":"3251-P","h":"#dbd8d1","g":"red","n":"Đỏ","s":"light","b":"high","t":"neutral","l":216},{"c":"3641-P","h":"#e3dcda","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":222},{"c":"3661-P","h":"#e6e0e2","g":"red","n":"Đỏ","s":"light","b":"high","t":"neutral","l":226},{"c":"3671-P","h":"#e7ddde","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":224},{"c":"2002-P","h":"#f6d2e1","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":222},{"c":"2042-P","h":"#ebc1d2","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":207},{"c":"2072-P","h":"#f5b7c7","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":203},{"c":"2102-P","h":"#fbc2c5","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":211},{"c":"2112-P","h":"#f5bbc5","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":205},{"c":"2142-P","h":"#f6caca","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":215},{"c":"2003-P","h":"#f0c3d8","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":211},{"c":"2004-P","h":"#f0b4d4","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":202},{"c":"2005-T","h":"#e89cc5","g":"red","n":"Đỏ","s":"medium","b":"high","t":"warm","l":183},{"c":"2006-D","h":"#df86b7","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":166},{"c":"2007-D","h":"#d370a4","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":148},{"c":"2008-A","h":"#ab3067","g":"red","n":"Đỏ","s":"deep","b":"dark","t":"warm","l":91},{"c":"2043-P","h":"#e9b6cb","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":200},{"c":"2044-T","h":"#e4a4be","g":"red","n":"Đỏ","s":"medium","b":"high","t":"warm","l":186},{"c":"2045-D","h":"#db8fae","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":169},{"c":"2046-D","h":"#d781a4","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":159},{"c":"2047-A","h":"#c26283","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":130},{"c":"2048-A","h":"#984157","g":"red","n":"Đỏ","s":"deep","b":"dark","t":"warm","l":94},{"c":"2073-T","h":"#f1a7b9","g":"red","n":"Đỏ","s":"medium","b":"high","t":"warm","l":191},{"c":"2074-D","h":"#eb91a7","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":174},{"c":"2075-D","h":"#e18094","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":159},{"c":"2076-A","h":"#d15b6f","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":129},{"c":"2077-A","h":"#cf5164","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":121},{"c":"2078-A","h":"#ab3b3c","g":"red","n":"Đỏ","s":"deep","b":"dark","t":"warm","l":93},{"c":"2103-P","h":"#fcb7be","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":204},{"c":"2104-T","h":"#f4a3ad","g":"red","n":"Đỏ","s":"medium","b":"high","t":"warm","l":188},{"c":"2105-D","h":"#f492a2","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":177},{"c":"2106-D","h":"#e66977","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":144},{"c":"2107-A","h":"#d6515e","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":122},{"c":"2108-A","h":"#d33b3c","g":"red","n":"Đỏ","s":"deep","b":"mid","t":"warm","l":105},{"c":"2113-T","h":"#f1a9b5","g":"red","n":"Đỏ","s":"medium","b":"high","t":"warm","l":192},{"c":"2114-D","h":"#e995a4","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":176},{"c":"2115-D","h":"#e28a98","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":166},{"c":"2116-D","h":"#d7707c","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":144},{"c":"2117-A","h":"#d16775","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":136},{"c":"2118-A","h":"#b33b44","g":"red","n":"Đỏ","s":"deep","b":"dark","t":"warm","l":96},{"c":"2143-P","h":"#f0b8b9","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":201},{"c":"2144-T","h":"#e6a5a7","g":"red","n":"Đỏ","s":"medium","b":"high","t":"warm","l":185},{"c":"2145-T","h":"#d79395","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":168},{"c":"2146-D","h":"#ca7d7e","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":148},{"c":"2147-D","h":"#bd6868","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":129},{"c":"2148-A","h":"#994945","g":"red","n":"Đỏ","s":"deep","b":"dark","t":"warm","l":96},{"c":"2152-P","h":"#fbd9d1","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":226},{"c":"2153-P","h":"#f1c8c0","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":211},{"c":"2154-T","h":"#e3a8a1","g":"red","n":"Đỏ","s":"medium","b":"high","t":"warm","l":185},{"c":"2155-T","h":"#d18b84","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":159},{"c":"2156-D","h":"#b06560","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":123},{"c":"2157-D","h":"#a7574d","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":110},{"c":"2158-A","h":"#954b3f","g":"red","n":"Đỏ","s":"deep","b":"dark","t":"warm","l":96},{"c":"2162-P","h":"#fdddd1","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":229},{"c":"2163-P","h":"#ffc5b6","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":213},{"c":"2164-T","h":"#ffb6a7","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":202},{"c":"2165-D","h":"#fda293","g":"red","n":"Đỏ","s":"medium","b":"high","t":"warm","l":187},{"c":"2166-D","h":"#f7867a","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":166},{"c":"2167-A","h":"#ec6e5b","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":146},{"c":"2168-A","h":"#db4c41","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":118},{"c":"2182-P","h":"#fdcfbb","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":218},{"c":"2183-P","h":"#ffcbb6","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":216},{"c":"2184-T","h":"#f8b69f","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":199},{"c":"2185-T","h":"#f8a78f","g":"red","n":"Đỏ","s":"medium","b":"high","t":"warm","l":188},{"c":"2186-D","h":"#eb8469","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":160},{"c":"2187-A","h":"#e06d55","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":141},{"c":"2188-A","h":"#c65342","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":115},{"c":"2212-P","h":"#f9d4bf","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":221},{"c":"2213-P","h":"#f3c5ae","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":208},{"c":"2214-T","h":"#eeb39a","g":"red","n":"Đỏ","s":"medium","b":"high","t":"warm","l":194},{"c":"2215-D","h":"#df967f","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":169},{"c":"2216-D","h":"#d07b60","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":145},{"c":"2217-A","h":"#c06b51","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":129},{"c":"2218-A","h":"#aa503f","g":"red","n":"Đỏ","s":"deep","b":"mid","t":"warm","l":105},{"c":"2222-P","h":"#ffe8d8","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":237},{"c":"2223-P","h":"#fedac2","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":226},{"c":"2224-P","h":"#fbceb3","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":216},{"c":"2225-T","h":"#fac2a4","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":207},{"c":"2226-D","h":"#f8a17e","g":"red","n":"Đỏ","s":"medium","b":"high","t":"warm","l":183},{"c":"2227-A","h":"#ec7c55","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":153},{"c":"2228-A","h":"#e85a3e","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":129},{"c":"2242-P","h":"#f9dec0","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":227},{"c":"2243-P","h":"#f6d4b1","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":218},{"c":"2244-T","h":"#fad0a7","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":216},{"c":"2245-D","h":"#fbb683","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":197},{"c":"2246-D","h":"#f49e6c","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":178},{"c":"2247-D","h":"#ee8c53","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":163},{"c":"2248-A","h":"#e96a40","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":139},{"c":"2272-P","h":"#fde1c5","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":230},{"c":"2273-P","h":"#fbd7b6","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":222},{"c":"2274-T","h":"#f7caa2","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":211},{"c":"2275-D","h":"#eaac7d","g":"red","n":"Đỏ","s":"medium","b":"high","t":"warm","l":185},{"c":"2276-D","h":"#e09663","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":166},{"c":"2277-A","h":"#d38852","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":152},{"c":"2278-A","h":"#c4794f","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":139},{"c":"2312-P","h":"#ffdeb0","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":227},{"c":"2313-T","h":"#ffd38e","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":216},{"c":"2314-D","h":"#ffcc81","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":211},{"c":"2315-D","h":"#ffc471","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":204},{"c":"2316-D","h":"#ffb55a","g":"red","n":"Đỏ","s":"medium","b":"high","t":"warm","l":193},{"c":"2317-A","h":"#ffa335","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":178},{"c":"2318-A","h":"#f98925","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":159},{"c":"2322-P","h":"#faddb6","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":225},{"c":"2323-P","h":"#fad9a1","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":220},{"c":"2324-T","h":"#fed08d","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":214},{"c":"2325-D","h":"#ffbf6d","g":"red","n":"Đỏ","s":"light","b":"high","t":"warm","l":201},{"c":"2326-D","h":"#fbb35d","g":"red","n":"Đỏ","s":"medium","b":"high","t":"warm","l":191},{"c":"2327-D","h":"#f3a33c","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":175},{"c":"2328-A","h":"#ec8939","g":"red","n":"Đỏ","s":"medium","b":"mid","t":"warm","l":157},{"c":"3541-P","h":"#e2e5e0","g":"grey","n":"Xám","s":"light","b":"high","t":"neutral","l":228},{"c":"3542-P","h":"#c5cbca","g":"grey","n":"Xám","s":"light","b":"high","t":"neutral","l":201},{"c":"3543-P","h":"#b1babc","g":"grey","n":"Xám","s":"medium","b":"high","t":"neutral","l":184},{"c":"3544-T","h":"#9ba6aa","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":163},{"c":"3545-D","h":"#869298","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":143},{"c":"3546-D","h":"#7d898f","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":134},{"c":"3547-D","h":"#60696d","g":"grey","n":"Xám","s":"deep","b":"mid","t":"neutral","l":103},{"c":"3548-A","h":"#3b3b3c","g":"grey","n":"Xám","s":"deep","b":"dark","t":"neutral","l":59},{"c":"3321-P","h":"#f4eadd","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":236},{"c":"3322-P","h":"#e8ddd1","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":223},{"c":"3323-P","h":"#dfd2c7","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":213},{"c":"3324-T","h":"#cabaae","g":"grey","n":"Xám","s":"medium","b":"high","t":"warm","l":189},{"c":"3325-D","h":"#b7a598","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":169},{"c":"3326-D","h":"#a79487","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":152},{"c":"3327-A","h":"#867163","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":118},{"c":"3328-A","h":"#54463f","g":"grey","n":"Xám","s":"deep","b":"dark","t":"warm","l":73},{"c":"3291-P","h":"#f2eadf","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":235},{"c":"3292-P","h":"#e6dbd0","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":221},{"c":"3293-P","h":"#d6cabe","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":204},{"c":"3294-P","h":"#ccbeb1","g":"grey","n":"Xám","s":"medium","b":"high","t":"warm","l":193},{"c":"3295-T","h":"#b4a496","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":167},{"c":"3296-D","h":"#978374","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":135},{"c":"3297-D","h":"#867466","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":120},{"c":"3298-A","h":"#584a41","g":"grey","n":"Xám","s":"deep","b":"dark","t":"warm","l":77},{"c":"3281-P","h":"#e8dfd2","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":224},{"c":"3282-P","h":"#d8c9bb","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":204},{"c":"3283-P","h":"#c7b8aa","g":"grey","n":"Xám","s":"medium","b":"high","t":"warm","l":187},{"c":"3284-T","h":"#bdafa1","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":178},{"c":"3285-T","h":"#aa9b8d","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":158},{"c":"3286-D","h":"#9e8e7f","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":145},{"c":"3287-D","h":"#8d7b6a","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":126},{"c":"3288-A","h":"#5a4b41","g":"grey","n":"Xám","s":"deep","b":"dark","t":"warm","l":78},{"c":"3271-P","h":"#f7f1e4","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":241},{"c":"3272-P","h":"#f3ecdf","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":237},{"c":"3273-P","h":"#e1d9cd","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":218},{"c":"3274-T","h":"#cbc2b5","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":195},{"c":"3275-D","h":"#b8ad9f","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":175},{"c":"3276-D","h":"#ab9f91","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":161},{"c":"3277-D","h":"#9a8d7c","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":143},{"c":"3278-A","h":"#5f554c","g":"grey","n":"Xám","s":"deep","b":"dark","t":"neutral","l":87},{"c":"3351-P","h":"#e8d9c4","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":219},{"c":"3352-P","h":"#e1d2bc","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":212},{"c":"3353-P","h":"#d9cab3","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":204},{"c":"3354-T","h":"#cdbca3","g":"grey","n":"Xám","s":"medium","b":"high","t":"warm","l":190},{"c":"3355-T","h":"#bdaa8f","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":173},{"c":"3356-D","h":"#b09a7d","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":157},{"c":"3357-D","h":"#978165","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":132},{"c":"3358-A","h":"#6e5b48","g":"grey","n":"Xám","s":"deep","b":"dark","t":"warm","l":95},{"c":"3341-P","h":"#efe2cf","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":228},{"c":"3342-P","h":"#e8d7c1","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":218},{"c":"3343-P","h":"#ddcbb6","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":206},{"c":"3344-T","h":"#c7ae93","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":178},{"c":"3345-D","h":"#b3987c","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":157},{"c":"3346-D","h":"#a2866b","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":139},{"c":"3347-D","h":"#917659","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":123},{"c":"3348-A","h":"#6e5847","g":"grey","n":"Xám","s":"deep","b":"dark","t":"warm","l":93},{"c":"3361-P","h":"#e9dec9","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":223},{"c":"3362-P","h":"#e0d1ba","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":211},{"c":"3363-P","h":"#d9c9ae","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":203},{"c":"3364-T","h":"#d5bd9d","g":"grey","n":"Xám","s":"medium","b":"high","t":"warm","l":193},{"c":"3365-T","h":"#c9ae89","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":178},{"c":"3366-D","h":"#bc9f78","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":163},{"c":"3367-A","h":"#9f7f58","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":132},{"c":"3368-A","h":"#81684c","g":"grey","n":"Xám","s":"medium","b":"mid","t":"warm","l":108},{"c":"3511-P","h":"#d9ddcc","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":218},{"c":"3512-P","h":"#cfd1c1","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":207},{"c":"3513-T","h":"#c4c5b5","g":"grey","n":"Xám","s":"medium","b":"high","t":"neutral","l":195},{"c":"3514-T","h":"#b1b7a8","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":179},{"c":"3515-T","h":"#a0a696","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":162},{"c":"3516-D","h":"#878d7b","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":137},{"c":"3517-D","h":"#798270","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":125},{"c":"3518-A","h":"#4b544c","g":"grey","n":"Xám","s":"deep","b":"dark","t":"neutral","l":80},{"c":"3521-P","h":"#dbdfd3","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":220},{"c":"3522-P","h":"#c9ccc2","g":"grey","n":"Xám","s":"light","b":"high","t":"neutral","l":202},{"c":"3523-P","h":"#b9c0b5","g":"grey","n":"Xám","s":"medium","b":"high","t":"neutral","l":189},{"c":"3524-T","h":"#b1b9af","g":"grey","n":"Xám","s":"medium","b":"high","t":"neutral","l":181},{"c":"3525-T","h":"#a1aba1","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":167},{"c":"3526-D","h":"#8c958a","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":145},{"c":"3527-A","h":"#616a5e","g":"grey","n":"Xám","s":"deep","b":"mid","t":"neutral","l":102},{"c":"3528-A","h":"#444843","g":"grey","n":"Xám","s":"deep","b":"dark","t":"neutral","l":70},{"c":"3551-P","h":"#e3e8e3","g":"grey","n":"Xám","s":"light","b":"high","t":"neutral","l":230},{"c":"3552-P","h":"#dce3df","g":"grey","n":"Xám","s":"light","b":"high","t":"neutral","l":224},{"c":"3553-P","h":"#c1d0d0","g":"grey","n":"Xám","s":"light","b":"high","t":"cool","l":204},{"c":"3554-T","h":"#a4babc","g":"grey","n":"Xám","s":"medium","b":"mid","t":"cool","l":180},{"c":"3555-T","h":"#99afb0","g":"grey","n":"Xám","s":"medium","b":"mid","t":"cool","l":169},{"c":"3556-D","h":"#829a9c","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":147},{"c":"3557-D","h":"#698586","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":125},{"c":"3558-A","h":"#394a50","g":"grey","n":"Xám","s":"deep","b":"dark","t":"cool","l":70},{"c":"3531-P","h":"#d7d5cd","g":"grey","n":"Xám","s":"light","b":"high","t":"neutral","l":213},{"c":"3532-P","h":"#c6c5c0","g":"grey","n":"Xám","s":"light","b":"high","t":"neutral","l":197},{"c":"3533-P","h":"#b7b9b6","g":"grey","n":"Xám","s":"medium","b":"high","t":"neutral","l":184},{"c":"3534-T","h":"#aab2b1","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":175},{"c":"3535-T","h":"#a0aaab","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":167},{"c":"3536-T","h":"#8f9a9d","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":151},{"c":"3537-D","h":"#6d777a","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":116},{"c":"3538-A","h":"#394145","g":"grey","n":"Xám","s":"deep","b":"dark","t":"neutral","l":63},{"c":"3591-P","h":"#ebe8e3","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":232},{"c":"3592-P","h":"#e3e3de","g":"grey","n":"Xám","s":"light","b":"high","t":"neutral","l":226},{"c":"3593-P","h":"#d6d9d8","g":"grey","n":"Xám","s":"light","b":"high","t":"neutral","l":216},{"c":"3594-P","h":"#c8cacb","g":"grey","n":"Xám","s":"light","b":"high","t":"neutral","l":202},{"c":"3595-T","h":"#a8acb0","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":171},{"c":"3596-T","h":"#8e939a","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":146},{"c":"3597-D","h":"#65696f","g":"grey","n":"Xám","s":"deep","b":"mid","t":"neutral","l":104},{"c":"3598-A","h":"#3c3b3c","g":"grey","n":"Xám","s":"deep","b":"dark","t":"neutral","l":59},{"c":"3601-P","h":"#e1dcd4","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":221},{"c":"3602-P","h":"#d2cdc6","g":"grey","n":"Xám","s":"light","b":"high","t":"neutral","l":206},{"c":"3603-T","h":"#b9b9b5","g":"grey","n":"Xám","s":"medium","b":"high","t":"neutral","l":185},{"c":"3604-T","h":"#a7a8a6","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":167},{"c":"3605-T","h":"#9c9d9d","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":157},{"c":"3606-D","h":"#86898a","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":136},{"c":"3607-D","h":"#696c6d","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":107},{"c":"3608-A","h":"#3c4043","g":"grey","n":"Xám","s":"deep","b":"dark","t":"neutral","l":63},{"c":"3611-P","h":"#e7e3dc","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":227},{"c":"3612-P","h":"#dddbd4","g":"grey","n":"Xám","s":"light","b":"high","t":"neutral","l":219},{"c":"3613-P","h":"#c9c7c3","g":"grey","n":"Xám","s":"light","b":"high","t":"neutral","l":199},{"c":"3614-T","h":"#b8b6b0","g":"grey","n":"Xám","s":"medium","b":"high","t":"neutral","l":182},{"c":"3615-T","h":"#aeaba4","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":171},{"c":"3616-D","h":"#908d88","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":141},{"c":"3617-D","h":"#827e77","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":126},{"c":"3618-A","h":"#4d4c4b","g":"grey","n":"Xám","s":"deep","b":"dark","t":"neutral","l":76},{"c":"3621-P","h":"#eae7df","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":231},{"c":"3622-P","h":"#e3e0da","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":224},{"c":"3623-P","h":"#cdcbc7","g":"grey","n":"Xám","s":"light","b":"high","t":"neutral","l":203},{"c":"3624-T","h":"#b3afab","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":176},{"c":"3625-D","h":"#a09c99","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":157},{"c":"3626-D","h":"#888683","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":134},{"c":"3627-D","h":"#736e6a","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":111},{"c":"3628-A","h":"#484748","g":"grey","n":"Xám","s":"deep","b":"dark","t":"neutral","l":71},{"c":"3631-P","h":"#ded7d4","g":"grey","n":"Xám","s":"light","b":"high","t":"warm","l":217},{"c":"3632-P","h":"#cdc9c7","g":"grey","n":"Xám","s":"light","b":"high","t":"neutral","l":202},{"c":"3633-P","h":"#c1bebc","g":"grey","n":"Xám","s":"medium","b":"high","t":"neutral","l":191},{"c":"3634-T","h":"#b1aeac","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":175},{"c":"3635-T","h":"#a09d9b","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":158},{"c":"3636-T","h":"#989494","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":149},{"c":"3637-D","h":"#817c77","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":125},{"c":"3638-A","h":"#4c4749","g":"grey","n":"Xám","s":"deep","b":"dark","t":"neutral","l":73},{"c":"3261-P","h":"#dcdad4","g":"grey","n":"Xám","s":"light","b":"high","t":"neutral","l":218},{"c":"3262-P","h":"#c7bfbb","g":"grey","n":"Xám","s":"medium","b":"high","t":"neutral","l":193},{"c":"3263-P","h":"#b4aeaa","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":175},{"c":"3264-T","h":"#a19b98","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":156},{"c":"3265-D","h":"#978e8d","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":145},{"c":"3266-D","h":"#847974","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":124},{"c":"3267-D","h":"#7b6f6b","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":114},{"c":"3268-A","h":"#4f484a","g":"grey","n":"Xám","s":"deep","b":"dark","t":"neutral","l":74},{"c":"3251-P","h":"#dbd8d1","g":"grey","n":"Xám","s":"light","b":"high","t":"neutral","l":216},{"c":"3252-P","h":"#cdc7c2","g":"grey","n":"Xám","s":"light","b":"high","t":"neutral","l":200},{"c":"3253-P","h":"#bdb5b1","g":"grey","n":"Xám","s":"medium","b":"high","t":"neutral","l":183},{"c":"3254-T","h":"#b3aba8","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":173},{"c":"3255-T","h":"#aca3a0","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":165},{"c":"3256-D","h":"#9c928e","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":149},{"c":"3257-D","h":"#827772","g":"grey","n":"Xám","s":"medium","b":"mid","t":"neutral","l":122},{"c":"3258-A","h":"#554d4b","g":"grey","n":"Xám","s":"deep","b":"dark","t":"neutral","l":79},{"c":"2651-P","h":"#dee8d9","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"warm","l":227},{"c":"2652-P","h":"#c1d3c2","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"warm","l":204},{"c":"2653-T","h":"#b0c5b2","g":"blue","n":"Xanh dương","s":"medium","b":"high","t":"warm","l":189},{"c":"2654-T","h":"#a4b9a4","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"warm","l":176},{"c":"2655-T","h":"#99af97","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"warm","l":166},{"c":"2656-D","h":"#799279","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"neutral","l":136},{"c":"2657-D","h":"#6c826a","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"neutral","l":121},{"c":"2658-A","h":"#506453","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"neutral","l":92},{"c":"2711-P","h":"#e7efe4","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"warm","l":235},{"c":"2712-P","h":"#cce1d4","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"warm","l":217},{"c":"2713-P","h":"#c5ddcf","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"warm","l":212},{"c":"2714-P","h":"#b1d0bf","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"warm","l":197},{"c":"2715-T","h":"#9bbfab","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"warm","l":178},{"c":"2716-D","h":"#8ab19b","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"warm","l":163},{"c":"2717-A","h":"#608a70","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"warm","l":122},{"c":"2718-A","h":"#3e564b","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":78},{"c":"2741-P","h":"#dcf1e1","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"warm","l":233},{"c":"2742-P","h":"#aae4d0","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":208},{"c":"2743-P","h":"#9cddc8","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":199},{"c":"2744-T","h":"#7fd4ba","g":"blue","n":"Xanh dương","s":"medium","b":"high","t":"cool","l":184},{"c":"2745-D","h":"#62c7b1","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":166},{"c":"2746-D","h":"#11ac91","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":123},{"c":"2747-A","h":"#009277","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":99},{"c":"2748-A","h":"#1b5b4c","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":70},{"c":"2751-P","h":"#e7eee2","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"warm","l":235},{"c":"2752-P","h":"#ddeadf","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"warm","l":229},{"c":"2753-P","h":"#bcdad0","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":208},{"c":"2754-T","h":"#9fc7ba","g":"blue","n":"Xanh dương","s":"medium","b":"high","t":"cool","l":186},{"c":"2755-D","h":"#85b4a5","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":164},{"c":"2756-D","h":"#659886","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":135},{"c":"2757-A","h":"#568675","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":118},{"c":"2758-A","h":"#2f574f","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":74},{"c":"2761-P","h":"#e4f0e5","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"warm","l":235},{"c":"2762-P","h":"#b7dcd0","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":208},{"c":"2763-P","h":"#a9d5c8","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":198},{"c":"2764-T","h":"#94c7b9","g":"blue","n":"Xanh dương","s":"medium","b":"high","t":"cool","l":182},{"c":"2765-T","h":"#7cbaaa","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":166},{"c":"2766-D","h":"#6aaa99","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":149},{"c":"2767-D","h":"#509884","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":128},{"c":"2768-A","h":"#3c6155","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":85},{"c":"2771-P","h":"#daeee4","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":231},{"c":"2772-P","h":"#bee6da","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":217},{"c":"2773-P","h":"#abded3","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":205},{"c":"2774-T","h":"#75c3b5","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":170},{"c":"2775-D","h":"#5fb4a4","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":153},{"c":"2776-D","h":"#3b9f8d","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":127},{"c":"2777-A","h":"#2c927d","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":113},{"c":"2778-A","h":"#0d6658","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":74},{"c":"2781-P","h":"#e6f0e1","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"warm","l":235},{"c":"2782-P","h":"#d8f0e5","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":232},{"c":"2783-P","h":"#cbece2","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":225},{"c":"2784-T","h":"#a1e1d7","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":205},{"c":"2785-T","h":"#83d6ca","g":"blue","n":"Xanh dương","s":"medium","b":"high","t":"cool","l":188},{"c":"2786-D","h":"#43bfad","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":152},{"c":"2787-D","h":"#00b19b","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":122},{"c":"2788-A","h":"#007b66","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":84},{"c":"2791-P","h":"#e6f0e7","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"warm","l":236},{"c":"2792-P","h":"#bfe2db","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":215},{"c":"2793-P","h":"#acd6d1","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":201},{"c":"2794-T","h":"#92c7c2","g":"blue","n":"Xanh dương","s":"medium","b":"high","t":"cool","l":183},{"c":"2795-T","h":"#7bb7b3","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":165},{"c":"2796-D","h":"#63a4a0","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":144},{"c":"2797-D","h":"#488d87","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":120},{"c":"2798-A","h":"#325553","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":74},{"c":"2801-P","h":"#d5ecde","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"warm","l":228},{"c":"2802-P","h":"#c7e9db","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":221},{"c":"2803-P","h":"#98d4cd","g":"blue","n":"Xanh dương","s":"medium","b":"high","t":"cool","l":193},{"c":"2804-T","h":"#7ac9c2","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":177},{"c":"2805-D","h":"#5bbcb7","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":158},{"c":"2806-D","h":"#2aa8a3","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":130},{"c":"2807-A","h":"#00948e","g":"blue","n":"Xanh dương","s":"deep","b":"mid","t":"cool","l":103},{"c":"2808-A","h":"#006967","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":73},{"c":"2821-P","h":"#e3f0e7","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"warm","l":235},{"c":"2822-P","h":"#c7e8e2","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":221},{"c":"2823-P","h":"#a4dcdb","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":203},{"c":"2824-T","h":"#7ccdd1","g":"blue","n":"Xanh dương","s":"medium","b":"high","t":"cool","l":181},{"c":"2825-T","h":"#5dc0c5","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":163},{"c":"2826-D","h":"#32b0b5","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":139},{"c":"2827-D","h":"#009fa3","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":112},{"c":"2828-A","h":"#007276","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":80},{"c":"2831-P","h":"#e1f0e7","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"warm","l":234},{"c":"2832-P","h":"#bce8e2","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":218},{"c":"2833-P","h":"#a7d9d4","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":201},{"c":"2834-T","h":"#81c5c4","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":177},{"c":"2835-D","h":"#5aa8a9","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":145},{"c":"2836-D","h":"#3a928f","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":119},{"c":"2837-A","h":"#2c8282","g":"blue","n":"Xanh dương","s":"deep","b":"mid","t":"cool","l":104},{"c":"2838-A","h":"#2f5053","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":70},{"c":"2841-P","h":"#e8f2e7","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"warm","l":238},{"c":"2842-P","h":"#cce2dc","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":219},{"c":"2843-P","h":"#b1d0cd","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":198},{"c":"2844-T","h":"#97bdbb","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":177},{"c":"2845-T","h":"#84b0ae","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":163},{"c":"2846-D","h":"#6c9898","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":139},{"c":"2847-D","h":"#548380","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":117},{"c":"2848-A","h":"#3b5353","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":76},{"c":"2851-P","h":"#e0ede6","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"warm","l":232},{"c":"2852-P","h":"#bcd8db","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":208},{"c":"2853-P","h":"#a6ccd3","g":"blue","n":"Xanh dương","s":"medium","b":"high","t":"cool","l":193},{"c":"2854-T","h":"#86b9c3","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":171},{"c":"2855-T","h":"#6ea9b5","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":153},{"c":"2856-D","h":"#5d97a4","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":135},{"c":"2857-A","h":"#3f7a85","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":106},{"c":"2858-A","h":"#2c4e5c","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":69},{"c":"2861-P","h":"#e8f0e8","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"warm","l":237},{"c":"2862-P","h":"#c3e3e6","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":218},{"c":"2863-P","h":"#a1c6de","g":"blue","n":"Xanh dương","s":"medium","b":"high","t":"cool","l":190},{"c":"2864-T","h":"#8db6d5","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":173},{"c":"2865-D","h":"#5ab7d0","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":158},{"c":"2866-D","h":"#6896c0","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":141},{"c":"2867-D","h":"#0095b2","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":108},{"c":"2868-A","h":"#005c78","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":68},{"c":"2881-P","h":"#deeeeb","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":233},{"c":"2882-P","h":"#add9e6","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":205},{"c":"2883-P","h":"#98cee4","g":"blue","n":"Xanh dương","s":"medium","b":"high","t":"cool","l":192},{"c":"2884-T","h":"#77bfdf","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":173},{"c":"2885-D","h":"#5eb3da","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":158},{"c":"2886-D","h":"#1a94c5","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":117},{"c":"2887-A","h":"#2272a1","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":95},{"c":"2888-A","h":"#005985","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":67},{"c":"2911-P","h":"#e4eae8","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"neutral","l":232},{"c":"2912-P","h":"#c0d4e2","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":208},{"c":"2913-P","h":"#aac9db","g":"blue","n":"Xanh dương","s":"medium","b":"high","t":"cool","l":194},{"c":"2914-T","h":"#93bcd5","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":179},{"c":"2915-T","h":"#7dacc9","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":161},{"c":"2916-D","h":"#6499b8","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":141},{"c":"2917-D","h":"#4582a2","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":115},{"c":"2918-A","h":"#264e72","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":70},{"c":"2931-P","h":"#e8ede8","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"neutral","l":235},{"c":"2932-P","h":"#cae1e6","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":219},{"c":"2933-P","h":"#add5e6","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":203},{"c":"2934-P","h":"#9bcee8","g":"blue","n":"Xanh dương","s":"medium","b":"high","t":"cool","l":194},{"c":"2935-T","h":"#78bae1","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":171},{"c":"2936-D","h":"#5baadb","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":152},{"c":"2937-D","h":"#0f89c6","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":107},{"c":"2938-A","h":"#255991","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":80},{"c":"2961-P","h":"#e4ebe9","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":233},{"c":"2962-P","h":"#b1cddf","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":199},{"c":"2963-P","h":"#a1c6de","g":"blue","n":"Xanh dương","s":"medium","b":"high","t":"cool","l":190},{"c":"2964-T","h":"#8db6d5","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":173},{"c":"2965-T","h":"#74a4cd","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":154},{"c":"2966-D","h":"#6896c0","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":141},{"c":"2967-A","h":"#3f70a3","g":"blue","n":"Xanh dương","s":"deep","b":"mid","t":"cool","l":103},{"c":"2968-A","h":"#2a4274","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":65},{"c":"3561-P","h":"#e9eae4","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"neutral","l":233},{"c":"3562-P","h":"#a4b8c4","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":179},{"c":"3563-T","h":"#91a8b6","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":163},{"c":"3564-D","h":"#7997a6","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":144},{"c":"3565-D","h":"#7b8f9b","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":138},{"c":"3566-D","h":"#5f7b8b","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":116},{"c":"3567-A","h":"#526d7c","g":"blue","n":"Xanh dương","s":"deep","b":"mid","t":"cool","l":103},{"c":"3568-A","h":"#323c4b","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":59},{"c":"3581-P","h":"#e7e8e5","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"neutral","l":231},{"c":"3582-P","h":"#c7cdd0","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"neutral","l":204},{"c":"3583-P","h":"#b0bfc4","g":"blue","n":"Xanh dương","s":"medium","b":"high","t":"cool","l":187},{"c":"3584-P","h":"#a8bac3","g":"blue","n":"Xanh dương","s":"medium","b":"high","t":"cool","l":182},{"c":"3585-T","h":"#95a9b4","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":164},{"c":"3586-D","h":"#8194a0","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":144},{"c":"3587-D","h":"#60727b","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"neutral","l":110},{"c":"3588-A","h":"#333b44","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":58},{"c":"3011-P","h":"#e6e3e2","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"neutral","l":228},{"c":"3012-P","h":"#c5c8d3","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":200},{"c":"3013-P","h":"#b7bac9","g":"blue","n":"Xanh dương","s":"medium","b":"high","t":"cool","l":187},{"c":"3014-T","h":"#a6abbe","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":172},{"c":"3015-D","h":"#9097b0","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":152},{"c":"3016-D","h":"#848ba4","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":140},{"c":"3017-D","h":"#636982","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":106},{"c":"3018-A","h":"#3c425a","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":67},{"c":"2991-P","h":"#e6e7e5","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"neutral","l":230},{"c":"2992-P","h":"#c3cbd8","g":"blue","n":"Xanh dương","s":"light","b":"high","t":"cool","l":202},{"c":"2993-P","h":"#b5c4d3","g":"blue","n":"Xanh dương","s":"medium","b":"high","t":"cool","l":193},{"c":"2994-T","h":"#a6b5cd","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":179},{"c":"2995-T","h":"#8da2c1","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":159},{"c":"2996-D","h":"#768db0","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":138},{"c":"2997-D","h":"#60789e","g":"blue","n":"Xanh dương","s":"medium","b":"mid","t":"cool","l":117},{"c":"2998-A","h":"#2e4366","g":"blue","n":"Xanh dương","s":"deep","b":"dark","t":"cool","l":65},{"c":"2201-P","h":"#f9e6d8","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":234},{"c":"2202-P","h":"#f1c6b6","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":209},{"c":"2203-P","h":"#e6b5a5","g":"brown","n":"Nâu","s":"medium","b":"high","t":"warm","l":194},{"c":"2204-T","h":"#dea392","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":179},{"c":"2205-T","h":"#ca8b7b","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":156},{"c":"2206-D","h":"#ba7a68","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":139},{"c":"2207-D","h":"#ae6653","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":121},{"c":"2208-A","h":"#8b4e43","g":"brown","n":"Nâu","s":"deep","b":"dark","t":"warm","l":95},{"c":"2251-P","h":"#f9ddce","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":228},{"c":"2252-P","h":"#f4d2c4","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":219},{"c":"2253-P","h":"#f3c8b5","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":211},{"c":"2254-P","h":"#edb8a2","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":197},{"c":"2255-T","h":"#e2a68e","g":"brown","n":"Nâu","s":"medium","b":"high","t":"warm","l":181},{"c":"2256-T","h":"#d48f76","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":161},{"c":"2257-D","h":"#bc7059","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":132},{"c":"2258-A","h":"#995241","g":"brown","n":"Nâu","s":"deep","b":"mid","t":"warm","l":101},{"c":"2191-P","h":"#fae0ca","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":229},{"c":"2192-P","h":"#f9d6bf","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":222},{"c":"2193-P","h":"#f4c7a9","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":209},{"c":"2194-T","h":"#e8b194","g":"brown","n":"Nâu","s":"medium","b":"high","t":"warm","l":190},{"c":"2195-T","h":"#dfa083","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":176},{"c":"2196-D","h":"#d28c70","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":158},{"c":"2197-D","h":"#c87959","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":141},{"c":"2198-A","h":"#ad6049","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":116},{"c":"3181-P","h":"#f7e5da","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":233},{"c":"3182-P","h":"#f1d5c8","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":220},{"c":"3183-P","h":"#e4c4b5","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":204},{"c":"3184-P","h":"#dcb5a4","g":"brown","n":"Nâu","s":"medium","b":"high","t":"warm","l":191},{"c":"3185-T","h":"#ca9886","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":165},{"c":"3186-D","h":"#ba8573","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":147},{"c":"3187-D","h":"#a9705d","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":127},{"c":"3188-A","h":"#814f43","g":"brown","n":"Nâu","s":"deep","b":"dark","t":"warm","l":93},{"c":"2261-P","h":"#fae6d2","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":234},{"c":"2262-P","h":"#f1d0b1","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":214},{"c":"2263-P","h":"#ecc5a6","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":205},{"c":"2264-T","h":"#e0b392","g":"brown","n":"Nâu","s":"medium","b":"high","t":"warm","l":189},{"c":"2265-D","h":"#cf9676","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":163},{"c":"2266-D","h":"#c28460","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":146},{"c":"2267-A","h":"#b3714e","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":129},{"c":"2268-A","h":"#a06347","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":114},{"c":"2281-P","h":"#f2d4b7","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":218},{"c":"2282-P","h":"#e7c8ae","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":206},{"c":"2283-P","h":"#e2bc9d","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":196},{"c":"2284-P","h":"#d3ac89","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":180},{"c":"2285-D","h":"#c99976","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":163},{"c":"2286-D","h":"#bf8d6e","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":152},{"c":"2287-A","h":"#a16d4c","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":121},{"c":"2288-A","h":"#8f634a","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":109},{"c":"2291-P","h":"#f7e4ce","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":231},{"c":"2292-P","h":"#f9ddc3","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":226},{"c":"2293-P","h":"#f1d1b1","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":215},{"c":"2294-P","h":"#e9c5a2","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":204},{"c":"2295-T","h":"#d9ab81","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":180},{"c":"2296-D","h":"#c48f63","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":154},{"c":"2297-D","h":"#bb8457","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":143},{"c":"2298-A","h":"#96684a","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":114},{"c":"2351-P","h":"#faeddd","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":239},{"c":"2352-P","h":"#e9ceb4","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":211},{"c":"2353-T","h":"#dfbea0","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":196},{"c":"2354-T","h":"#d1ac8c","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":179},{"c":"2355-D","h":"#c09877","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":160},{"c":"2356-D","h":"#b08561","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":142},{"c":"2357-A","h":"#a47854","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":129},{"c":"2358-A","h":"#8b654b","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":109},{"c":"2361-P","h":"#fbefd7","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":240},{"c":"2362-P","h":"#f5d8b3","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":220},{"c":"2363-T","h":"#ebc9a0","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":206},{"c":"2364-T","h":"#e1bb8d","g":"brown","n":"Nâu","s":"medium","b":"high","t":"warm","l":193},{"c":"2365-D","h":"#d4a978","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":176},{"c":"2366-D","h":"#c69662","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":158},{"c":"2367-A","h":"#bb8754","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":145},{"c":"2368-A","h":"#976f49","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":119},{"c":"3141-P","h":"#f5e3e0","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":232},{"c":"3142-P","h":"#e1b7b7","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":196},{"c":"3143-T","h":"#d8adae","g":"brown","n":"Nâu","s":"medium","b":"high","t":"warm","l":186},{"c":"3144-D","h":"#ca9c9f","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":170},{"c":"3145-D","h":"#bb8588","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":149},{"c":"3146-D","h":"#ab777b","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":135},{"c":"3147-A","h":"#8b5453","g":"brown","n":"Nâu","s":"deep","b":"mid","t":"warm","l":100},{"c":"3148-A","h":"#6b4740","g":"brown","n":"Nâu","s":"deep","b":"dark","t":"warm","l":81},{"c":"3161-P","h":"#efddd6","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":226},{"c":"3162-P","h":"#d9c0b6","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":198},{"c":"3163-P","h":"#cfb6ae","g":"brown","n":"Nâu","s":"medium","b":"high","t":"warm","l":189},{"c":"3164-P","h":"#c9aba3","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":179},{"c":"3165-T","h":"#b89791","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":160},{"c":"3166-T","h":"#a6847e","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":141},{"c":"3167-D","h":"#886058","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":107},{"c":"3168-A","h":"#654b45","g":"brown","n":"Nâu","s":"deep","b":"dark","t":"warm","l":82},{"c":"3211-P","h":"#f5e4dd","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":232},{"c":"3212-P","h":"#e8c8bf","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":209},{"c":"3213-P","h":"#dbb7af","g":"brown","n":"Nâu","s":"medium","b":"high","t":"warm","l":193},{"c":"3214-T","h":"#c79891","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":165},{"c":"3215-T","h":"#b28078","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":142},{"c":"3216-D","h":"#9d6b64","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":121},{"c":"3217-D","h":"#8b594f","g":"brown","n":"Nâu","s":"deep","b":"mid","t":"warm","l":103},{"c":"3218-A","h":"#6e4a41","g":"brown","n":"Nâu","s":"deep","b":"dark","t":"warm","l":84},{"c":"3221-P","h":"#f1e1d7","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":229},{"c":"3222-P","h":"#e6d3cb","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":216},{"c":"3223-P","h":"#d9c1b9","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":199},{"c":"3224-P","h":"#c8aba4","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":179},{"c":"3225-T","h":"#b28d86","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":151},{"c":"3226-D","h":"#9b7772","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":129},{"c":"3227-D","h":"#89635a","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":109},{"c":"3228-A","h":"#5f4841","g":"brown","n":"Nâu","s":"deep","b":"dark","t":"warm","l":78},{"c":"3201-P","h":"#f9ebe0","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":238},{"c":"3202-P","h":"#e6c7bb","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":207},{"c":"3203-P","h":"#dbb7ac","g":"brown","n":"Nâu","s":"medium","b":"high","t":"warm","l":193},{"c":"3204-P","h":"#cfa699","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":177},{"c":"3205-T","h":"#be9287","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":158},{"c":"3206-D","h":"#ae8071","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":140},{"c":"3207-D","h":"#906457","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":112},{"c":"3208-A","h":"#68463d","g":"brown","n":"Nâu","s":"deep","b":"dark","t":"warm","l":79},{"c":"3191-P","h":"#f3e2d6","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":230},{"c":"3192-P","h":"#e9d0c6","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":214},{"c":"3193-P","h":"#dfc3b8","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":202},{"c":"3194-T","h":"#d1ada0","g":"brown","n":"Nâu","s":"medium","b":"high","t":"warm","l":182},{"c":"3195-D","h":"#af8578","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":144},{"c":"3196-D","h":"#9e7061","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":124},{"c":"3197-A","h":"#906254","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":110},{"c":"3198-A","h":"#724b41","g":"brown","n":"Nâu","s":"deep","b":"dark","t":"warm","l":86},{"c":"3231-P","h":"#ebdad1","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":222},{"c":"3232-P","h":"#e3d0c7","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":213},{"c":"3233-P","h":"#d8c3b8","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":200},{"c":"3234-T","h":"#ccb4a8","g":"brown","n":"Nâu","s":"medium","b":"high","t":"warm","l":186},{"c":"3235-T","h":"#b4968b","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":158},{"c":"3236-D","h":"#a38074","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":137},{"c":"3237-D","h":"#927166","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":122},{"c":"3238-D","h":"#684e48","g":"brown","n":"Nâu","s":"deep","b":"dark","t":"warm","l":85},{"c":"3241-P","h":"#e5d6cc","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":217},{"c":"3242-P","h":"#d3c1b8","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":197},{"c":"3243-P","h":"#c5b1a8","g":"brown","n":"Nâu","s":"medium","b":"high","t":"warm","l":182},{"c":"3244-T","h":"#baa59c","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":170},{"c":"3245-D","h":"#a48e85","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":148},{"c":"3246-D","h":"#988077","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":134},{"c":"3247-A","h":"#765d53","g":"brown","n":"Nâu","s":"deep","b":"dark","t":"warm","l":99},{"c":"3248-A","h":"#57453f","g":"brown","n":"Nâu","s":"deep","b":"dark","t":"warm","l":74},{"c":"3301-P","h":"#f3e6d8","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":232},{"c":"3302-P","h":"#e2ccbb","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":209},{"c":"3303-P","h":"#d7c1ae","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":197},{"c":"3304-T","h":"#cfb49e","g":"brown","n":"Nâu","s":"medium","b":"high","t":"warm","l":186},{"c":"3305-T","h":"#b49785","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":158},{"c":"3306-D","h":"#a4846f","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":139},{"c":"3307-D","h":"#96755f","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":124},{"c":"3308-A","h":"#70564a","g":"brown","n":"Nâu","s":"deep","b":"dark","t":"warm","l":92},{"c":"3331-P","h":"#e2d5c9","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":216},{"c":"3332-P","h":"#ddcec0","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":209},{"c":"3333-P","h":"#d2bfab","g":"brown","n":"Nâu","s":"medium","b":"high","t":"warm","l":194},{"c":"3334-T","h":"#c9b7a4","g":"brown","n":"Nâu","s":"medium","b":"high","t":"warm","l":186},{"c":"3335-D","h":"#b7a28d","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":166},{"c":"3336-D","h":"#ab9680","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":154},{"c":"3337-D","h":"#987f69","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":132},{"c":"3338-A","h":"#715c4f","g":"brown","n":"Nâu","s":"deep","b":"dark","t":"warm","l":97},{"c":"3311-P","h":"#f5ece1","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":237},{"c":"3312-P","h":"#efe3d7","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":229},{"c":"3313-P","h":"#d8c7ba","g":"brown","n":"Nâu","s":"light","b":"high","t":"warm","l":203},{"c":"3314-P","h":"#c9b6a9","g":"brown","n":"Nâu","s":"medium","b":"high","t":"warm","l":186},{"c":"3315-T","h":"#bba697","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":171},{"c":"3316-D","h":"#a59082","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":149},{"c":"3317-D","h":"#876f60","g":"brown","n":"Nâu","s":"medium","b":"mid","t":"warm","l":116},{"c":"3318-A","h":"#614c42","g":"brown","n":"Nâu","s":"deep","b":"dark","t":"warm","l":81},{"c":"2371-P","h":"#fbe8c6","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":234},{"c":"2372-P","h":"#f9e1b8","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":228},{"c":"2373-T","h":"#eed4a4","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":214},{"c":"2374-T","h":"#eecf99","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":210},{"c":"2375-D","h":"#dcb475","g":"yellow","n":"Vàng","s":"medium","b":"high","t":"warm","l":185},{"c":"2376-D","h":"#d0a35a","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":168},{"c":"2377-A","h":"#c4954f","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":155},{"c":"2378-A","h":"#ad7d44","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":133},{"c":"2381-P","h":"#fbefd9","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":240},{"c":"2382-P","h":"#f7deb0","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":224},{"c":"2383-P","h":"#f7dba3","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":221},{"c":"2384-T","h":"#f4d18f","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":212},{"c":"2385-T","h":"#edc27b","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":199},{"c":"2386-D","h":"#daa952","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":174},{"c":"2387-A","h":"#c6923c","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":152},{"c":"2388-A","h":"#a77b35","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":128},{"c":"2391-P","h":"#fbefd3","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":239},{"c":"2392-P","h":"#f9e6be","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":231},{"c":"2393-T","h":"#f8d79e","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":218},{"c":"2394-T","h":"#f3c883","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":205},{"c":"2395-D","h":"#eaba6c","g":"yellow","n":"Vàng","s":"medium","b":"high","t":"warm","l":191},{"c":"2396-D","h":"#e3ac54","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":178},{"c":"2397-A","h":"#d9a147","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":167},{"c":"2398-A","h":"#c08745","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":145},{"c":"2401-P","h":"#f8eed9","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":239},{"c":"2402-P","h":"#fbeed2","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":239},{"c":"2403-P","h":"#fce8c3","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":234},{"c":"2404-P","h":"#fcdc9d","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":222},{"c":"2405-T","h":"#fbcc7b","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":209},{"c":"2406-D","h":"#f5c16a","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":199},{"c":"2407-D","h":"#efba5c","g":"yellow","n":"Vàng","s":"medium","b":"high","t":"warm","l":191},{"c":"2408-A","h":"#d08e32","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":151},{"c":"2421-P","h":"#fbf3db","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":243},{"c":"2422-P","h":"#fbf1d1","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":240},{"c":"2423-P","h":"#ffe9ae","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":233},{"c":"2424-T","h":"#ffe59c","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":228},{"c":"2425-D","h":"#ffdc7e","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":220},{"c":"2426-D","h":"#ffd162","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":210},{"c":"2427-D","h":"#ffc83a","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":200},{"c":"2428-A","h":"#ffba00","g":"yellow","n":"Vàng","s":"medium","b":"high","t":"warm","l":185},{"c":"2441-P","h":"#faf1d6","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":241},{"c":"2442-P","h":"#fbf0cd","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":239},{"c":"2443-P","h":"#f9eabf","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":234},{"c":"2444-P","h":"#fde09d","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":225},{"c":"2445-T","h":"#f8d787","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":216},{"c":"2446-D","h":"#f1c566","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":199},{"c":"2447-D","h":"#e6b54d","g":"yellow","n":"Vàng","s":"medium","b":"high","t":"warm","l":184},{"c":"2448-A","h":"#dd9b22","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":161},{"c":"2461-P","h":"#faecce","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":237},{"c":"2462-P","h":"#f9e7bf","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":232},{"c":"2463-P","h":"#f3dda9","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":222},{"c":"2464-T","h":"#eed698","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":214},{"c":"2465-D","h":"#dfbe6e","g":"yellow","n":"Vàng","s":"medium","b":"high","t":"warm","l":191},{"c":"2466-D","h":"#cca74d","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":168},{"c":"2467-A","h":"#c19c3d","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":156},{"c":"2468-A","h":"#9d7c33","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":126},{"c":"2481-P","h":"#f8f0d4","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":239},{"c":"2482-P","h":"#f5e8b9","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":231},{"c":"2483-T","h":"#f3e0a5","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":223},{"c":"2484-T","h":"#ebd791","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":213},{"c":"2485-D","h":"#e2cc7b","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":201},{"c":"2486-D","h":"#d8bf65","g":"yellow","n":"Vàng","s":"medium","b":"high","t":"warm","l":188},{"c":"2487-A","h":"#ccb04e","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":173},{"c":"2488-A","h":"#b19540","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":148},{"c":"2491-P","h":"#faf0d2","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":240},{"c":"2492-P","h":"#fbedb9","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":235},{"c":"2493-P","h":"#fde9a6","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":231},{"c":"2494-T","h":"#fde89b","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":230},{"c":"2495-T","h":"#fbe188","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":223},{"c":"2496-D","h":"#f9d36a","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":210},{"c":"2497-D","h":"#f1c440","g":"yellow","n":"Vàng","s":"medium","b":"high","t":"warm","l":194},{"c":"2498-A","h":"#eeb327","g":"yellow","n":"Vàng","s":"medium","b":"high","t":"warm","l":181},{"c":"2501-P","h":"#faf4de","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":243},{"c":"2502-P","h":"#fdf0b6","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":237},{"c":"2503-P","h":"#fdeba2","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":232},{"c":"2504-T","h":"#ffe78b","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":228},{"c":"2505-D","h":"#ffe179","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":222},{"c":"2506-D","h":"#ffdd69","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":218},{"c":"2507-D","h":"#ffd249","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":208},{"c":"2508-A","h":"#ffc000","g":"yellow","n":"Vàng","s":"medium","b":"high","t":"warm","l":189},{"c":"2511-P","h":"#f8f1d7","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":240},{"c":"2512-P","h":"#fbf0ca","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":239},{"c":"2513-P","h":"#fdefbc","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":237},{"c":"2514-P","h":"#ffeda9","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":235},{"c":"2515-T","h":"#ffe98d","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":229},{"c":"2516-D","h":"#ffe77f","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":226},{"c":"2517-D","h":"#fede60","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":217},{"c":"2518-A","h":"#ffc619","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":195},{"c":"2531-P","h":"#f6edce","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":236},{"c":"2532-P","h":"#f8ebbf","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":234},{"c":"2533-P","h":"#f6e9b2","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":231},{"c":"2534-T","h":"#f1df91","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":219},{"c":"2535-D","h":"#eeda83","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":214},{"c":"2536-D","h":"#e8d374","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":206},{"c":"2537-D","h":"#ddc555","g":"yellow","n":"Vàng","s":"medium","b":"high","t":"warm","l":191},{"c":"2538-A","h":"#bfa23e","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":159},{"c":"3421-P","h":"#f8f2dd","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":241},{"c":"3422-P","h":"#f5edd4","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":237},{"c":"3423-P","h":"#ece3c1","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":226},{"c":"3424-T","h":"#d5c997","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":199},{"c":"3425-D","h":"#c9bb81","g":"yellow","n":"Vàng","s":"medium","b":"high","t":"warm","l":185},{"c":"3426-D","h":"#bcad6d","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":170},{"c":"3427-A","h":"#ad9b5b","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":153},{"c":"3428-A","h":"#897a48","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":121},{"c":"3371-P","h":"#f5ecd8","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":236},{"c":"3372-P","h":"#f2e8d0","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":232},{"c":"3373-P","h":"#ebdbb9","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":220},{"c":"3374-P","h":"#e7d3a9","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":212},{"c":"3375-T","h":"#decb9d","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":203},{"c":"3376-D","h":"#d0b885","g":"yellow","n":"Vàng","s":"medium","b":"high","t":"warm","l":185},{"c":"3377-D","h":"#bda266","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":163},{"c":"3378-A","h":"#9d7e44","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":129},{"c":"3381-P","h":"#f6eddb","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":238},{"c":"3382-P","h":"#e8d7ba","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":217},{"c":"3383-T","h":"#e0ccab","g":"yellow","n":"Vàng","s":"light","b":"high","t":"warm","l":206},{"c":"3384-T","h":"#cfba94","g":"yellow","n":"Vàng","s":"medium","b":"high","t":"warm","l":188},{"c":"3385-D","h":"#c6af88","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":177},{"c":"3386-D","h":"#b0976c","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":154},{"c":"3387-A","h":"#a1875e","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":138},{"c":"3388-A","h":"#7e694c","g":"yellow","n":"Vàng","s":"medium","b":"mid","t":"warm","l":108},{"c":"2561-P","h":"#f3f2d5","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":239},{"c":"2562-P","h":"#e2edaa","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":226},{"c":"2563-T","h":"#dfe89e","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":221},{"c":"2564-T","h":"#e0e88c","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":219},{"c":"2565-D","h":"#dce480","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":214},{"c":"2566-D","h":"#dae276","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":211},{"c":"2567-D","h":"#c9d34d","g":"green","n":"Xanh lá","s":"medium","b":"high","t":"warm","l":193},{"c":"2568-A","h":"#a4ba34","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":164},{"c":"2591-P","h":"#eaebca","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":231},{"c":"2592-P","h":"#e3e7bd","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":225},{"c":"2593-P","h":"#dce5af","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":220},{"c":"2594-D","h":"#bfce82","g":"green","n":"Xanh lá","s":"medium","b":"high","t":"warm","l":193},{"c":"2595-D","h":"#abc06a","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":176},{"c":"2596-A","h":"#9bb148","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":158},{"c":"2597-A","h":"#8faa46","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":151},{"c":"2598-A","h":"#5b8834","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":113},{"c":"2601-P","h":"#ecf0d2","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":235},{"c":"2602-P","h":"#e0e9c9","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":227},{"c":"2603-P","h":"#d9e4b9","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":220},{"c":"2604-T","h":"#b9cd8f","g":"green","n":"Xanh lá","s":"medium","b":"high","t":"warm","l":192},{"c":"2605-D","h":"#a7be79","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":175},{"c":"2606-D","h":"#98ae64","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":159},{"c":"2607-A","h":"#8ca254","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":147},{"c":"2608-A","h":"#607f42","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":111},{"c":"2621-P","h":"#e4efcc","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":232},{"c":"2622-P","h":"#ddeab2","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":224},{"c":"2623-T","h":"#d2e6a1","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":216},{"c":"2624-T","h":"#c1de8e","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":204},{"c":"2625-D","h":"#b5d883","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":196},{"c":"2626-D","h":"#a2ce60","g":"green","n":"Xanh lá","s":"medium","b":"high","t":"warm","l":180},{"c":"2627-D","h":"#9ac95c","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":175},{"c":"2628-A","h":"#70af4a","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":145},{"c":"2631-P","h":"#e8eed4","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":233},{"c":"2632-P","h":"#dfebcb","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":228},{"c":"2633-P","h":"#d5e6bd","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":220},{"c":"2634-P","h":"#c5dda7","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":208},{"c":"2635-T","h":"#abc985","g":"green","n":"Xanh lá","s":"medium","b":"high","t":"warm","l":184},{"c":"2636-D","h":"#9bbf74","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":172},{"c":"2637-D","h":"#88b05c","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":154},{"c":"2638-A","h":"#568a3c","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":114},{"c":"2641-P","h":"#e6eed9","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":233},{"c":"2642-P","h":"#e0ebd1","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":229},{"c":"2643-P","h":"#d2e1c4","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":217},{"c":"2644-P","h":"#c2d6b1","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":204},{"c":"2645-T","h":"#acc493","g":"green","n":"Xanh lá","s":"medium","b":"high","t":"warm","l":183},{"c":"2646-D","h":"#9ab580","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":167},{"c":"2647-A","h":"#7b965d","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":135},{"c":"2648-A","h":"#577646","g":"green","n":"Xanh lá","s":"deep","b":"mid","t":"warm","l":103},{"c":"2681-P","h":"#eaf3df","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":238},{"c":"2682-P","h":"#dcf0d5","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":231},{"c":"2683-P","h":"#bce7b6","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":213},{"c":"2684-T","h":"#9dd99b","g":"green","n":"Xanh lá","s":"medium","b":"high","t":"warm","l":192},{"c":"2685-D","h":"#90d28e","g":"green","n":"Xanh lá","s":"medium","b":"high","t":"warm","l":183},{"c":"2686-D","h":"#85ce87","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":176},{"c":"2687-D","h":"#71c270","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":160},{"c":"2688-A","h":"#03964a","g":"green","n":"Xanh lá","s":"deep","b":"dark","t":"warm","l":97},{"c":"2701-P","h":"#e7f0e2","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":236},{"c":"2702-P","h":"#d0ecd9","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":225},{"c":"2703-P","h":"#c0e3cc","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":214},{"c":"2704-T","h":"#9ed2b2","g":"green","n":"Xanh lá","s":"medium","b":"high","t":"warm","l":191},{"c":"2705-D","h":"#73b38c","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":155},{"c":"2706-D","h":"#5da176","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":136},{"c":"2707-A","h":"#519367","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":122},{"c":"2708-A","h":"#326748","g":"green","n":"Xanh lá","s":"deep","b":"dark","t":"warm","l":84},{"c":"2731-P","h":"#e8f2e6","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":238},{"c":"2732-P","h":"#bfead8","g":"green","n":"Xanh lá","s":"light","b":"high","t":"cool","l":219},{"c":"2733-P","h":"#aae5d0","g":"green","n":"Xanh lá","s":"light","b":"high","t":"cool","l":209},{"c":"2734-T","h":"#96dcc1","g":"green","n":"Xanh lá","s":"light","b":"high","t":"cool","l":196},{"c":"2735-T","h":"#70cdac","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"cool","l":173},{"c":"2736-D","h":"#4fbf98","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"cool","l":153},{"c":"2737-D","h":"#20ad80","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"cool","l":126},{"c":"2738-A","h":"#007e56","g":"green","n":"Xanh lá","s":"deep","b":"dark","t":"cool","l":84},{"c":"3391-P","h":"#f3e8d5","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":233},{"c":"3392-P","h":"#ebe0cc","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":225},{"c":"3393-P","h":"#dfd1b9","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":210},{"c":"3394-T","h":"#cec0a4","g":"green","n":"Xanh lá","s":"medium","b":"high","t":"warm","l":193},{"c":"3395-D","h":"#b4a688","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":167},{"c":"3396-D","h":"#9b8a6a","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":139},{"c":"3397-A","h":"#8b7c5b","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":125},{"c":"3398-A","h":"#695d4a","g":"green","n":"Xanh lá","s":"deep","b":"dark","t":"warm","l":94},{"c":"3401-P","h":"#f0e6d0","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":230},{"c":"3402-P","h":"#ebe0c4","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":224},{"c":"3403-P","h":"#ddd0b1","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":208},{"c":"3404-T","h":"#c8ba94","g":"green","n":"Xanh lá","s":"medium","b":"high","t":"warm","l":186},{"c":"3405-D","h":"#b8a77e","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":167},{"c":"3406-D","h":"#9c8c62","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":140},{"c":"3407-A","h":"#8f7f55","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":127},{"c":"3408-A","h":"#817354","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":116},{"c":"3411-P","h":"#ebe7c9","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":229},{"c":"3412-P","h":"#e7e1be","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":223},{"c":"3413-P","h":"#e4d8ae","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":215},{"c":"3414-T","h":"#dacc9c","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":203},{"c":"3415-T","h":"#cdbe87","g":"green","n":"Xanh lá","s":"medium","b":"high","t":"warm","l":188},{"c":"3416-D","h":"#c1b27a","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":176},{"c":"3417-A","h":"#a69659","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":148},{"c":"3418-A","h":"#847b4c","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":120},{"c":"3431-P","h":"#f4edd4","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":236},{"c":"3432-P","h":"#e5deb6","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":220},{"c":"3433-T","h":"#d8d3a5","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":207},{"c":"3434-T","h":"#c9c18a","g":"green","n":"Xanh lá","s":"medium","b":"high","t":"warm","l":189},{"c":"3435-D","h":"#c0b87f","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":180},{"c":"3436-D","h":"#b8b074","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":172},{"c":"3437-D","h":"#a79f61","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":154},{"c":"3438-A","h":"#837f4b","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":122},{"c":"3441-P","h":"#f5eed3","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":237},{"c":"3442-P","h":"#f5eecb","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":236},{"c":"3443-T","h":"#eadfa8","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":220},{"c":"3444-T","h":"#dfd191","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":206},{"c":"3445-D","h":"#d2c27c","g":"green","n":"Xanh lá","s":"medium","b":"high","t":"warm","l":191},{"c":"3446-D","h":"#c1b262","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":173},{"c":"3447-A","h":"#b7a555","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":161},{"c":"3448-A","h":"#988748","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":133},{"c":"3451-P","h":"#eee7d1","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":231},{"c":"3452-P","h":"#e7e0c6","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":223},{"c":"3453-P","h":"#ded6b4","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":213},{"c":"3454-T","h":"#d0c9a5","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":199},{"c":"3455-T","h":"#bdb58e","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":179},{"c":"3456-D","h":"#b3aa7f","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":168},{"c":"3457-D","h":"#a29767","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":149},{"c":"3458-A","h":"#706a4c","g":"green","n":"Xanh lá","s":"deep","b":"mid","t":"warm","l":104},{"c":"3461-P","h":"#f2ebd3","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":234},{"c":"3462-P","h":"#ddd8b6","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":214},{"c":"3463-T","h":"#cfcba3","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":200},{"c":"3464-T","h":"#bbb88a","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":180},{"c":"3465-D","h":"#a8a576","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":161},{"c":"3466-D","h":"#979362","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":143},{"c":"3467-A","h":"#8a8859","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":131},{"c":"3468-A","h":"#6b6c4c","g":"green","n":"Xanh lá","s":"deep","b":"mid","t":"warm","l":104},{"c":"3471-P","h":"#e8e6d0","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":228},{"c":"3472-P","h":"#e1e0c8","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":222},{"c":"3473-P","h":"#d9d8ba","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":213},{"c":"3474-P","h":"#ccccaa","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":200},{"c":"3475-T","h":"#b8b78e","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":179},{"c":"3476-D","h":"#9c9d73","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":152},{"c":"3477-D","h":"#8a8b63","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":134},{"c":"3478-A","h":"#636849","g":"green","n":"Xanh lá","s":"deep","b":"dark","t":"warm","l":99},{"c":"3481-P","h":"#eaead6","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":232},{"c":"3482-P","h":"#e0e4cc","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":224},{"c":"3483-P","h":"#ddddc0","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":218},{"c":"3484-T","h":"#c9cba7","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":198},{"c":"3485-D","h":"#a4a980","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":163},{"c":"3486-D","h":"#989e76","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":152},{"c":"3487-A","h":"#838961","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":131},{"c":"3488-A","h":"#5f6748","g":"green","n":"Xanh lá","s":"deep","b":"dark","t":"warm","l":97},{"c":"3491-P","h":"#e7e7d5","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":229},{"c":"3492-P","h":"#d9decb","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":218},{"c":"3493-P","h":"#cfd6c2","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":210},{"c":"3494-P","h":"#c1c8b0","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":195},{"c":"3495-T","h":"#b0b99e","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":179},{"c":"3496-D","h":"#98a386","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":156},{"c":"3497-D","h":"#828c6b","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"warm","l":133},{"c":"3498-A","h":"#596853","g":"green","n":"Xanh lá","s":"deep","b":"dark","t":"neutral","l":97},{"c":"3501-P","h":"#e7e7d5","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":229},{"c":"3502-P","h":"#dfe3ce","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":223},{"c":"3503-P","h":"#d3d8c6","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":212},{"c":"3504-T","h":"#c7cdb8","g":"green","n":"Xanh lá","s":"light","b":"high","t":"warm","l":201},{"c":"3505-T","h":"#b8c0aa","g":"green","n":"Xanh lá","s":"medium","b":"high","t":"warm","l":187},{"c":"3506-D","h":"#99a088","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"neutral","l":155},{"c":"3507-D","h":"#80886d","g":"green","n":"Xanh lá","s":"medium","b":"mid","t":"neutral","l":131},{"c":"3508-A","h":"#565f4e","g":"green","n":"Xanh lá","s":"deep","b":"dark","t":"neutral","l":90},{"c":"3021-P","h":"#e5e7e9","g":"purple","n":"Tím","s":"light","b":"high","t":"neutral","l":231},{"c":"3022-P","h":"#ccd6e6","g":"purple","n":"Tím","s":"light","b":"high","t":"cool","l":213},{"c":"3023-P","h":"#b5c5e0","g":"purple","n":"Tím","s":"light","b":"high","t":"cool","l":195},{"c":"3024-T","h":"#a6b9dc","g":"purple","n":"Tím","s":"medium","b":"high","t":"cool","l":183},{"c":"3025-T","h":"#92a8d4","g":"purple","n":"Tím","s":"medium","b":"mid","t":"cool","l":166},{"c":"3026-D","h":"#758ec4","g":"purple","n":"Tím","s":"medium","b":"mid","t":"cool","l":141},{"c":"3027-A","h":"#5469a3","g":"purple","n":"Tím","s":"medium","b":"mid","t":"cool","l":105},{"c":"3028-A","h":"#383b65","g":"purple","n":"Tím","s":"deep","b":"dark","t":"cool","l":63},{"c":"3051-P","h":"#e4dfe6","g":"purple","n":"Tím","s":"light","b":"high","t":"neutral","l":225},{"c":"3052-P","h":"#d5d2e2","g":"purple","n":"Tím","s":"light","b":"high","t":"cool","l":213},{"c":"3053-P","h":"#c5c4dd","g":"purple","n":"Tím","s":"light","b":"high","t":"cool","l":199},{"c":"3054-T","h":"#aeb0d5","g":"purple","n":"Tím","s":"medium","b":"mid","t":"cool","l":180},{"c":"3055-D","h":"#9d9fcb","g":"purple","n":"Tím","s":"medium","b":"mid","t":"cool","l":163},{"c":"3056-D","h":"#888bc0","g":"purple","n":"Tím","s":"medium","b":"mid","t":"cool","l":144},{"c":"3057-D","h":"#7076ae","g":"purple","n":"Tím","s":"medium","b":"mid","t":"cool","l":123},{"c":"3058-A","h":"#484e85","g":"purple","n":"Tím","s":"deep","b":"dark","t":"cool","l":82},{"c":"3061-P","h":"#ded9e2","g":"purple","n":"Tím","s":"light","b":"high","t":"cool","l":220},{"c":"3062-P","h":"#d0cbda","g":"purple","n":"Tím","s":"light","b":"high","t":"cool","l":206},{"c":"3063-P","h":"#c1bbd1","g":"purple","n":"Tím","s":"medium","b":"high","t":"cool","l":191},{"c":"3064-T","h":"#aeabc9","g":"purple","n":"Tím","s":"medium","b":"mid","t":"cool","l":175},{"c":"3065-D","h":"#9895b7","g":"purple","n":"Tím","s":"medium","b":"mid","t":"cool","l":154},{"c":"3066-D","h":"#8683ab","g":"purple","n":"Tím","s":"medium","b":"mid","t":"cool","l":136},{"c":"3067-A","h":"#696891","g":"purple","n":"Tím","s":"medium","b":"mid","t":"cool","l":109},{"c":"3068-A","h":"#424062","g":"purple","n":"Tím","s":"deep","b":"dark","t":"cool","l":68},{"c":"3081-P","h":"#e9dde5","g":"purple","n":"Tím","s":"light","b":"high","t":"warm","l":226},{"c":"3082-P","h":"#e3d6e5","g":"purple","n":"Tím","s":"light","b":"high","t":"warm","l":220},{"c":"3083-P","h":"#d4c6de","g":"purple","n":"Tím","s":"light","b":"high","t":"cool","l":205},{"c":"3084-T","h":"#c5b6d6","g":"purple","n":"Tím","s":"medium","b":"high","t":"cool","l":190},{"c":"3085-T","h":"#b2a2cc","g":"purple","n":"Tím","s":"medium","b":"mid","t":"cool","l":172},{"c":"3086-D","h":"#9f8bbc","g":"purple","n":"Tím","s":"medium","b":"mid","t":"cool","l":151},{"c":"3087-A","h":"#7d69a0","g":"purple","n":"Tím","s":"medium","b":"mid","t":"cool","l":117},{"c":"3088-A","h":"#463c6a","g":"purple","n":"Tím","s":"deep","b":"dark","t":"cool","l":68},{"c":"3101-P","h":"#f3e1e6","g":"purple","n":"Tím","s":"light","b":"high","t":"warm","l":231},{"c":"3102-P","h":"#e2cadf","g":"purple","n":"Tím","s":"light","b":"high","t":"warm","l":212},{"c":"3103-P","h":"#d3b7d6","g":"purple","n":"Tím","s":"medium","b":"high","t":"warm","l":195},{"c":"3104-T","h":"#cba9cf","g":"purple","n":"Tím","s":"medium","b":"high","t":"warm","l":183},{"c":"3105-T","h":"#c09dc8","g":"purple","n":"Tím","s":"medium","b":"mid","t":"warm","l":172},{"c":"3106-D","h":"#b089bb","g":"purple","n":"Tím","s":"medium","b":"mid","t":"warm","l":154},{"c":"3107-A","h":"#8e6196","g":"purple","n":"Tím","s":"medium","b":"mid","t":"warm","l":116},{"c":"3108-A","h":"#654574","g":"purple","n":"Tím","s":"deep","b":"dark","t":"cool","l":84},{"c":"3091-P","h":"#ebdde4","g":"purple","n":"Tím","s":"light","b":"high","t":"warm","l":226},{"c":"3092-P","h":"#e9d8e3","g":"purple","n":"Tím","s":"light","b":"high","t":"warm","l":222},{"c":"3093-P","h":"#e0cce0","g":"purple","n":"Tím","s":"light","b":"high","t":"warm","l":212},{"c":"3094-P","h":"#dbbeda","g":"purple","n":"Tím","s":"light","b":"high","t":"warm","l":202},{"c":"3095-T","h":"#d1b1d4","g":"purple","n":"Tím","s":"medium","b":"high","t":"warm","l":191},{"c":"3096-D","h":"#b68abb","g":"purple","n":"Tím","s":"medium","b":"mid","t":"warm","l":157},{"c":"3097-D","h":"#90679d","g":"purple","n":"Tím","s":"medium","b":"mid","t":"warm","l":121},{"c":"3098-A","h":"#5c4069","g":"purple","n":"Tím","s":"deep","b":"dark","t":"cool","l":77},{"c":"3121-P","h":"#f4e5e5","g":"purple","n":"Tím","s":"light","b":"high","t":"warm","l":233},{"c":"3122-P","h":"#e5b9d0","g":"purple","n":"Tím","s":"light","b":"high","t":"warm","l":201},{"c":"3123-T","h":"#daa7c4","g":"purple","n":"Tím","s":"medium","b":"high","t":"warm","l":186},{"c":"3124-D","h":"#d090b2","g":"purple","n":"Tím","s":"medium","b":"mid","t":"warm","l":167},{"c":"3125-D","h":"#c17da3","g":"purple","n":"Tím","s":"medium","b":"mid","t":"warm","l":150},{"c":"3126-D","h":"#b66a90","g":"purple","n":"Tím","s":"medium","b":"mid","t":"warm","l":133},{"c":"3127-A","h":"#965277","g":"purple","n":"Tím","s":"medium","b":"mid","t":"warm","l":107},{"c":"3128-A","h":"#663640","g":"purple","n":"Tím","s":"deep","b":"dark","t":"warm","l":69},{"c":"2031-P","h":"#f5e0e0","g":"purple","n":"Tím","s":"light","b":"high","t":"warm","l":230},{"c":"2032-P","h":"#e6bbc6","g":"purple","n":"Tím","s":"light","b":"high","t":"warm","l":201},{"c":"2033-T","h":"#dcaaba","g":"purple","n":"Tím","s":"medium","b":"high","t":"warm","l":187},{"c":"2034-D","h":"#ce96aa","g":"purple","n":"Tím","s":"medium","b":"mid","t":"warm","l":169},{"c":"2035-D","h":"#c18298","g":"purple","n":"Tím","s":"medium","b":"mid","t":"warm","l":151},{"c":"2036-A","h":"#ab6578","g":"purple","n":"Tím","s":"medium","b":"mid","t":"warm","l":124},{"c":"2037-A","h":"#9b566a","g":"purple","n":"Tím","s":"medium","b":"mid","t":"warm","l":109},{"c":"2038-A","h":"#71424c","g":"purple","n":"Tím","s":"deep","b":"dark","t":"warm","l":81},{"c":"3641-P","h":"#e3dcda","g":"purple","n":"Tím","s":"light","b":"high","t":"warm","l":222},{"c":"3642-P","h":"#d4d0d1","g":"purple","n":"Tím","s":"light","b":"high","t":"neutral","l":209},{"c":"3643-P","h":"#bfbec5","g":"purple","n":"Tím","s":"medium","b":"high","t":"neutral","l":191},{"c":"3644-T","h":"#aeafbb","g":"purple","n":"Tím","s":"medium","b":"mid","t":"neutral","l":176},{"c":"3645-T","h":"#9f9dae","g":"purple","n":"Tím","s":"medium","b":"mid","t":"neutral","l":160},{"c":"3646-D","h":"#8b899a","g":"purple","n":"Tím","s":"medium","b":"mid","t":"neutral","l":140},{"c":"3647-D","h":"#656574","g":"purple","n":"Tím","s":"deep","b":"mid","t":"neutral","l":103},{"c":"3648-A","h":"#3e3c48","g":"purple","n":"Tím","s":"deep","b":"dark","t":"neutral","l":62},{"c":"3661-P","h":"#e6e0e2","g":"purple","n":"Tím","s":"light","b":"high","t":"neutral","l":226},{"c":"3662-P","h":"#c3bac8","g":"purple","n":"Tím","s":"medium","b":"high","t":"neutral","l":190},{"c":"3663-T","h":"#b2a9bb","g":"purple","n":"Tím","s":"medium","b":"mid","t":"neutral","l":174},{"c":"3664-T","h":"#9f96a9","g":"purple","n":"Tím","s":"medium","b":"mid","t":"neutral","l":155},{"c":"3665-D","h":"#8f8498","g":"purple","n":"Tím","s":"medium","b":"mid","t":"neutral","l":138},{"c":"3666-D","h":"#7f7387","g":"purple","n":"Tím","s":"medium","b":"mid","t":"neutral","l":121},{"c":"3667-A","h":"#716475","g":"purple","n":"Tím","s":"medium","b":"mid","t":"neutral","l":106},{"c":"3668-A","h":"#3d3540","g":"purple","n":"Tím","s":"deep","b":"dark","t":"neutral","l":57},{"c":"3671-P","h":"#e7ddde","g":"purple","n":"Tím","s":"light","b":"high","t":"warm","l":224},{"c":"3672-P","h":"#dfd3d6","g":"purple","n":"Tím","s":"light","b":"high","t":"warm","l":215},{"c":"3673-P","h":"#d3c4cf","g":"purple","n":"Tím","s":"light","b":"high","t":"warm","l":202},{"c":"3674-T","h":"#bfb0c0","g":"purple","n":"Tím","s":"medium","b":"high","t":"neutral","l":182},{"c":"3675-D","h":"#aa9baf","g":"purple","n":"Tím","s":"medium","b":"mid","t":"neutral","l":162},{"c":"3676-D","h":"#91859b","g":"purple","n":"Tím","s":"medium","b":"mid","t":"neutral","l":139},{"c":"3677-D","h":"#7e7086","g":"purple","n":"Tím","s":"medium","b":"mid","t":"neutral","l":119},{"c":"3678-A","h":"#474155","g":"purple","n":"Tím","s":"deep","b":"dark","t":"cool","l":69}];

  // Expand compact items to standard objects
  const RAW_ITEMS = RAW_ITEMS_DATA.map(item => ({
    code: item.c,
    hex: item.h,
    catId: item.g,
    catName: item.n,
    shade: item.s,
    brightness: item.b,
    tone: item.t,
    lum: item.l
  }));

  // Build category membership map: code -> Set of category names
  const CODE_CATEGORIES_MAP = new Map();
  RAW_ITEMS.forEach(item => {
    if (!CODE_CATEGORIES_MAP.has(item.code)) {
      CODE_CATEGORIES_MAP.set(item.code, []);
    }
    const arr = CODE_CATEGORIES_MAP.get(item.code);
    if (!arr.includes(item.catName)) {
      arr.push(item.catName);
    }
  });

  // Deduplicate unique colors for "Tất cả" (1.002 unique colors)
  const UNIQUE_MAP = new Map();
  RAW_ITEMS.forEach(item => {
    if (!UNIQUE_MAP.has(item.code)) {
      UNIQUE_MAP.set(item.code, {
        ...item,
        allCategories: CODE_CATEGORIES_MAP.get(item.code)
      });
    }
  });
  const UNIQUE_COLORS = Array.from(UNIQUE_MAP.values());

  // Attach allCategories to every item in RAW_ITEMS
  RAW_ITEMS.forEach(item => {
    item.allCategories = CODE_CATEGORIES_MAP.get(item.code) || [item.catName];
  });

  // --- 2. STATE MANAGEMENT ---
  const state = {
    selectedColor: UNIQUE_COLORS.find(c => c.code === '1340') || UNIQUE_COLORS[0],
    activeCategory: 'all', // 'all' | 'pastel' | 'red' | 'grey' | 'blue' | 'brown' | 'yellow' | 'green' | 'purple'
    activeShade: 'all',
    activeBrightness: 'all',
    activeTone: 'all',
    searchQuery: '',
    viewMode: 'grid', // 'grid' | 'compact'
    // Desktop progressive scroll limit
    desktopDisplayLimit: 48,
    desktopPageSize: 48,
    // Mobile pagination: exact 12 colors per page
    mobilePage: 1,
    mobilePageSize: 12,
    favorites: new Set()
  };

  // Restore favorites from localStorage
  try {
    const saved = localStorage.getItem('wanders_fav_colors');
    if (saved) {
      const arr = JSON.parse(saved);
      if (Array.isArray(arr)) arr.forEach(code => state.favorites.add(code));
    }
  } catch (e) {}

  // --- 3. UTILITIES ---
  function isDesktopView() {
    return window.innerWidth >= 1024;
  }

  function removeVietnameseTones(str) {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  }

  function getLuminance(hex) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const r = parseInt(c.substr(0, 2), 16);
    const g = parseInt(c.substr(2, 2), 16);
    const b = parseInt(c.substr(4, 2), 16);
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  function showToast(message) {
    const toast = document.getElementById('studio-toast');
    const msgEl = document.getElementById('studio-toast-msg');
    if (!toast || !msgEl) return;
    msgEl.textContent = message;
    toast.classList.add('show');

    if (window._toastTimer) clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  function saveFavorites() {
    try {
      localStorage.setItem('wanders_fav_colors', JSON.stringify(Array.from(state.favorites)));
    } catch (e) {}
  }

  // --- 4. FILTERING LOGIC ---
  function getFilteredColors() {
    let list;
    if (state.activeCategory === 'all') {
      list = UNIQUE_COLORS;
    } else {
      list = RAW_ITEMS.filter(item => item.catId === state.activeCategory);
    }

    if (state.searchQuery) {
      const q = removeVietnameseTones(state.searchQuery.trim().toLowerCase());
      list = list.filter(item => {
        const codeMatch = removeVietnameseTones(item.code.toLowerCase()).includes(q);
        const hexMatch = item.hex.toLowerCase().includes(q) || item.hex.replace('#', '').toLowerCase().includes(q);
        const catMatch = item.allCategories.some(cat => removeVietnameseTones(cat.toLowerCase()).includes(q));
        return codeMatch || hexMatch || catMatch;
      });
    }

    if (state.activeShade !== 'all') {
      list = list.filter(item => item.shade === state.activeShade);
    }
    if (state.activeBrightness !== 'all') {
      list = list.filter(item => item.brightness === state.activeBrightness);
    }
    if (state.activeTone !== 'all') {
      list = list.filter(item => item.tone === state.activeTone);
    }

    return list;
  }

  // --- 5. RENDERERS ---

  // A. Render Horizontal Category Tabs
  function renderCategoryTabs() {
    const container = document.getElementById('color-category-tabs');
    if (!container) return;

    container.innerHTML = CATEGORIES.map(cat => {
      const isActive = state.activeCategory === cat.id && !state.searchQuery;
      return `
        <button type="button" data-cat-id="${cat.id}"
          class="color-cat-tab ${isActive ? 'active' : ''}">
          <span class="color-cat-tab-name">${cat.name}</span>
          <span class="color-cat-tab-count">${cat.count.toLocaleString('vi-VN')}</span>
        </button>
      `;
    }).join('');

    // Attach click events
    container.querySelectorAll('.color-cat-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        const catId = btn.getAttribute('data-cat-id');
        setActiveCategory(catId, btn);
      });
    });
  }

  // B. Render Left Sidebar Collection Pills (Desktop)
  function renderCollectionPills() {
    const container = document.getElementById('collection-pills');
    if (!container) return;

    container.innerHTML = CATEGORIES.map(cat => {
      const isActive = state.activeCategory === cat.id && !state.searchQuery;
      return `
        <button type="button" data-collection-id="${cat.id}"
          class="col-pill-btn ${isActive ? 'active' : ''}">
          <span class="truncate">${cat.name}</span>
          ${isActive 
            ? `<svg width="15" height="15" style="color:#FFFFFF;" class="shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"></path></svg>` 
            : `<span class="col-pill-count shrink-0">${cat.count.toLocaleString('vi-VN')}</span>`
          }
        </button>
      `;
    }).join('');

    container.querySelectorAll('.col-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const colId = btn.getAttribute('data-collection-id');
        setActiveCategory(colId);
      });
    });
  }

  // C. Switch Active Category & Sync UI
  function setActiveCategory(catId, clickedTabEl) {
    state.activeCategory = catId;
    state.desktopDisplayLimit = state.desktopPageSize;
    state.mobilePage = 1;
    state.searchQuery = '';

    const searchInput = document.getElementById('color-search-input');
    if (searchInput) searchInput.value = '';
    const clearBtn = document.getElementById('color-search-clear');
    if (clearBtn) clearBtn.classList.add('hidden');

    // Sync toolbar dropdown
    const toolbarSelect = document.getElementById('toolbar-collection-select');
    if (toolbarSelect) toolbarSelect.value = catId;

    // Scroll active tab into view smoothly
    if (clickedTabEl) {
      clickedTabEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    } else {
      const tabEl = document.querySelector(`#color-category-tabs [data-cat-id="${catId}"]`);
      if (tabEl) tabEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    // Reset grid scroll to top on desktop
    const gridContainer = document.getElementById('swatch-grid-container');
    if (gridContainer) gridContainer.scrollTop = 0;

    renderCategoryTabs();
    renderCollectionPills();
    renderSwatchGrid();
  }

  // D. Render Color Swatch Grid (Desktop Independent Scroll vs Mobile 12-Card Pagination)
  function renderSwatchGrid() {
    const gridEl = document.getElementById('swatch-grid');
    const emptyEl = document.getElementById('swatch-empty');
    const countBadge = document.getElementById('color-count-badge');
    const loadMoreWrap = document.getElementById('load-more-wrap');
    const loadMoreBtn = document.getElementById('btn-load-more');
    const loadMoreCounter = document.getElementById('load-more-counter');
    const paginationEl = document.getElementById('mobile-pagination');
    if (!gridEl) return;

    const filtered = getFilteredColors();

    // Update count badge
    if (countBadge) {
      countBadge.textContent = `${filtered.length.toLocaleString('vi-VN')} màu`;
    }

    if (filtered.length === 0) {
      gridEl.innerHTML = '';
      if (emptyEl) emptyEl.classList.remove('hidden');
      if (loadMoreWrap) loadMoreWrap.classList.add('hidden');
      if (paginationEl) paginationEl.innerHTML = '';
      return;
    } else {
      if (emptyEl) emptyEl.classList.add('hidden');
    }

    const isDesktop = isDesktopView();
    let visibleList;

    if (isDesktop) {
      // DESKTOP: Progressive chunk rendering within independent scroll container
      visibleList = filtered.slice(0, state.desktopDisplayLimit);

      // Hide mobile pagination on desktop
      if (paginationEl) paginationEl.innerHTML = '';

      // Update load more controls
      if (loadMoreWrap) {
        if (state.desktopDisplayLimit < filtered.length) {
          loadMoreWrap.classList.remove('hidden');
          const remaining = filtered.length - visibleList.length;
          if (loadMoreCounter) {
            loadMoreCounter.innerHTML = `Đang hiển thị <strong class="text-[#073B2E]">${visibleList.length.toLocaleString('vi-VN')}</strong> / ${filtered.length.toLocaleString('vi-VN')} màu`;
          }
          if (loadMoreBtn) {
            loadMoreBtn.innerHTML = `
              <span>Xem thêm (${remaining.toLocaleString('vi-VN')} màu)</span>
              <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>
            `;
          }
        } else {
          loadMoreWrap.classList.remove('hidden');
          if (loadMoreCounter) {
            loadMoreCounter.innerHTML = `<span class="text-[#073B2E] font-medium">Đã hiển thị toàn bộ ${filtered.length.toLocaleString('vi-VN')} màu</span>`;
          }
          if (loadMoreBtn) {
            loadMoreBtn.classList.add('hidden');
          }
        }
      }
    } else {
      // MOBILE: Exact 12 colors per page in 2-column grid
      const totalPages = Math.ceil(filtered.length / state.mobilePageSize);
      if (state.mobilePage > totalPages) {
        state.mobilePage = Math.max(1, totalPages);
      }
      const startIndex = (state.mobilePage - 1) * state.mobilePageSize;
      visibleList = filtered.slice(startIndex, startIndex + state.mobilePageSize);

      if (loadMoreWrap) loadMoreWrap.classList.add('hidden');
      renderMobilePagination(filtered.length, totalPages);
    }

    // Determine grid classes based on viewMode
    const isCompact = state.viewMode === 'compact';
    gridEl.className = isCompact ? 'color-swatch-grid compact-mode' : 'color-swatch-grid';

    gridEl.innerHTML = visibleList.map(c => {
      const isSelected = state.selectedColor && state.selectedColor.code === c.code;

      return `
        <div data-color-code="${c.code}" class="swatch-card ${isSelected ? 'active' : ''}">
          <!-- Color Swatch Box -->
          <div class="swatch-color-box" style="background-color: ${c.hex};">
            ${isSelected ? `
              <div class="swatch-active-badge">
                <svg width="10" height="10" class="stroke-current" fill="none" stroke-width="3" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            ` : ''}
          </div>

          <!-- Color Label Below (Code + HEX) -->
          <div class="swatch-label-wrap">
            <div class="swatch-code">${c.code}</div>
            <div class="swatch-hex">${c.hex.toUpperCase()}</div>
          </div>
        </div>
      `;
    }).join('');

    // Attach click events
    gridEl.querySelectorAll('.swatch-card').forEach(card => {
      card.addEventListener('click', () => {
        const code = card.getAttribute('data-color-code');
        const colorObj = UNIQUE_COLORS.find(c => c.code === code) || RAW_ITEMS.find(c => c.code === code);
        if (colorObj) {
          selectColor(colorObj);
        }
      });
    });
  }

  // E. Render Mobile & Tablet Pagination (‹ Trước | 1 | 2 | 3 | ... | 13 | Sau ›)
  function renderMobilePagination(totalFiltered, totalPages) {
    const paginationEl = document.getElementById('mobile-pagination');
    if (!paginationEl) return;

    if (totalPages <= 1) {
      paginationEl.innerHTML = `
        <div class="page-status-text">
          Hiển thị toàn bộ <strong>${totalFiltered.toLocaleString('vi-VN')}</strong> màu
        </div>
      `;
      return;
    }

    const cur = state.mobilePage;

    // Generate pagination pages array with ellipsis
    let pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (cur <= 3) {
        pages.push(2, 3);
        if (cur === 3) pages.push(4);
        pages.push('...');
        pages.push(totalPages);
      } else if (cur >= totalPages - 2) {
        pages.push('...');
        if (cur === totalPages - 2) pages.push(totalPages - 3);
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push('...');
        pages.push(cur - 1, cur, cur + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    // Clean consecutive ellipses if any
    const cleanPages = [];
    for (let i = 0; i < pages.length; i++) {
      if (pages[i] === '...' && cleanPages[cleanPages.length - 1] === '...') continue;
      cleanPages.push(pages[i]);
    }

    const html = `
      <div class="pagination-controls">
        <button type="button" class="page-btn page-btn-nav prev-btn" data-page="${cur - 1}" ${cur <= 1 ? 'disabled' : ''} aria-label="Trang trước">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg>
          <span>Trước</span>
        </button>

        <div class="page-numbers">
          ${cleanPages.map(p => {
            if (p === '...') {
              return `<span class="page-ellipsis">…</span>`;
            }
            const isActive = p === cur;
            return `<button type="button" class="page-btn page-num-btn ${isActive ? 'active' : ''}" data-page="${p}">${p}</button>`;
          }).join('')}
        </div>

        <button type="button" class="page-btn page-btn-nav next-btn" data-page="${cur + 1}" ${cur >= totalPages ? 'disabled' : ''} aria-label="Trang sau">
          <span>Sau</span>
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>

      <div class="page-status-text">
        Trang <strong>${cur}</strong> / ${totalPages} · (${totalFiltered.toLocaleString('vi-VN')} màu)
      </div>
    `;

    paginationEl.innerHTML = html;

    // Attach click events
    paginationEl.querySelectorAll('.page-btn:not(:disabled)').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetPage = parseInt(btn.getAttribute('data-page'), 10);
        if (targetPage && targetPage !== cur && targetPage >= 1 && targetPage <= totalPages) {
          goToMobilePage(targetPage);
        }
      });
    });
  }

  function goToMobilePage(targetPage) {
    state.mobilePage = targetPage;
    renderSwatchGrid();

    // Smooth scroll to top of swatch grid, NOT top of site
    const targetEl = document.getElementById('swatch-grid-container') || document.getElementById('swatch-grid');
    if (targetEl) {
      const headerEl = document.querySelector('header');
      const headerH = headerEl ? headerEl.offsetHeight : 77;
      const rect = targetEl.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = rect.top + scrollTop - headerH - 12;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }

  // F. Select Color & Update Active Banner
  function selectColor(colorObj) {
    state.selectedColor = colorObj;
    updateActiveBanner();

    // Toggle active class on cards without full re-render
    const gridEl = document.getElementById('swatch-grid');
    if (gridEl) {
      gridEl.querySelectorAll('.swatch-card').forEach(card => {
        const code = card.getAttribute('data-color-code');
        if (code === colorObj.code) {
          card.classList.add('active');
          const box = card.querySelector('.swatch-color-box');
          if (box && !box.querySelector('.swatch-active-badge')) {
            const badge = document.createElement('div');
            badge.className = 'swatch-active-badge';
            badge.innerHTML = `<svg width="10" height="10" class="stroke-current" fill="none" stroke-width="3" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>`;
            box.appendChild(badge);
          }
        } else {
          card.classList.remove('active');
          const badge = card.querySelector('.swatch-active-badge');
          if (badge) badge.remove();
        }
      });
    }
  }

  // G. Update Active Preview Banner (Pure HEX, Auto-Contrast, Copy & Favorite)
  function updateActiveBanner() {
    const banner = document.getElementById('active-color-banner');
    const codeEl = document.getElementById('active-banner-code');
    const nameEl = document.getElementById('active-banner-name');
    const hexEl = document.getElementById('active-banner-hex');
    const tagEl = document.getElementById('active-banner-tag');
    const favBtn = document.getElementById('btn-fav-color');
    const iconHeart = document.getElementById('icon-heart');
    const copyBtn = document.getElementById('btn-copy-color');
    if (!banner || !state.selectedColor) return;

    const hex = state.selectedColor.hex;
    banner.style.backgroundColor = hex;

    if (codeEl) codeEl.textContent = state.selectedColor.code;
    if (nameEl) {
      const cats = state.selectedColor.allCategories || [state.selectedColor.catName];
      nameEl.textContent = cats.join(' · ');
    }
    if (hexEl) hexEl.textContent = hex.toUpperCase();

    // Calculate contrast luminance
    const lum = getLuminance(hex);
    const isLight = lum > 155;
    const textColor = isLight ? '#1F2937' : '#FFFFFF';
    const subColor = isLight ? 'rgba(31, 41, 55, 0.78)' : 'rgba(255, 255, 255, 0.88)';
    const btnBg = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.25)';
    const hexBg = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.2)';

    if (codeEl) codeEl.style.color = textColor;
    if (nameEl) nameEl.style.color = subColor;
    if (tagEl) tagEl.style.color = subColor;
    if (hexEl) {
      hexEl.style.backgroundColor = hexBg;
      hexEl.style.color = textColor;
    }

    if (favBtn) {
      favBtn.style.backgroundColor = btnBg;
      favBtn.style.color = textColor;
    }
    if (iconHeart) {
      const isFav = state.favorites.has(state.selectedColor.code);
      if (isFav) {
        iconHeart.setAttribute('fill', '#EF4444');
        iconHeart.setAttribute('stroke', '#EF4444');
      } else {
        iconHeart.setAttribute('fill', 'none');
        iconHeart.setAttribute('stroke', 'currentColor');
      }
    }
    if (copyBtn) {
      copyBtn.style.backgroundColor = btnBg;
      copyBtn.style.color = textColor;
    }
  }

  // --- 6. DESKTOP SCROLL COORDINATOR ---
  function initDesktopScrollCoordinator() {
    const studioSection = document.getElementById('color-studio-app');
    const gridContainer = document.getElementById('swatch-grid-container');
    if (!studioSection || !gridContainer) return;

    // 1. Auto progressive loading on scroll inside grid container
    gridContainer.addEventListener('scroll', () => {
      if (!isDesktopView()) return;
      const filtered = getFilteredColors();
      if (state.desktopDisplayLimit < filtered.length) {
        if (gridContainer.scrollTop + gridContainer.clientHeight >= gridContainer.scrollHeight - 350) {
          state.desktopDisplayLimit += state.desktopPageSize;
          renderSwatchGrid();
        }
      }
    }, { passive: true });

    // 2. Coordinated wheel handling across the studio section
    studioSection.addEventListener('wheel', (e) => {
      if (!isDesktopView()) return;

      const headerEl = document.querySelector('header');
      const headerH = headerEl ? headerEl.offsetHeight : 77;
      const secRect = studioSection.getBoundingClientRect();

      // Section is engaged when its top aligns with the sticky header
      const isEngaged = secRect.top <= headerH + 25 && secRect.bottom >= window.innerHeight - 35;

      if (!isEngaged) {
        return; // Allow natural document scroll into view
      }

      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      const filtered = getFilteredColors();
      const atBottom = gridContainer.scrollTop + gridContainer.clientHeight >= gridContainer.scrollHeight - 3;
      const atTop = gridContainer.scrollTop <= 2;

      if (isScrollingDown) {
        // Expand batch if approaching bottom of loaded items
        if (state.desktopDisplayLimit < filtered.length && gridContainer.scrollTop + gridContainer.clientHeight >= gridContainer.scrollHeight - 250) {
          state.desktopDisplayLimit += state.desktopPageSize;
          renderSwatchGrid();
        }

        const allLoadedAndAtBottom = (state.desktopDisplayLimit >= filtered.length) && atBottom;

        if (!allLoadedAndAtBottom) {
          e.preventDefault();
          gridContainer.scrollTop += e.deltaY;
        } else {
          // At very end of all colors: hand off to natural page scroll down
        }
      } else if (isScrollingUp) {
        if (!atTop) {
          e.preventDefault();
          gridContainer.scrollTop += e.deltaY;
        } else {
          // At very top of colors: hand off to natural page scroll up
        }
      }
    }, { passive: false });
  }

  // --- 7. GLOBAL PRESET PALETTE FUNCTION ---
  window.applyPresetPalette = function (hexArray, title) {
    let match = null;
    if (Array.isArray(hexArray) && hexArray.length > 0) {
      for (const target of hexArray) {
        match = UNIQUE_COLORS.find(c => c.hex.toLowerCase() === target.toLowerCase() || c.code.toLowerCase() === target.toLowerCase());
        if (match) break;
      }
    }

    if (!match) {
      match = UNIQUE_COLORS[0];
    }

    if (match) {
      state.activeCategory = match.catId || 'all';
      state.activeShade = 'all';
      state.activeBrightness = 'all';
      state.activeTone = 'all';
      state.searchQuery = '';
      state.desktopDisplayLimit = state.desktopPageSize;
      state.mobilePage = 1;

      const searchInput = document.getElementById('color-search-input');
      if (searchInput) searchInput.value = '';
      const clearBtn = document.getElementById('color-search-clear');
      if (clearBtn) clearBtn.classList.add('hidden');

      const tbCol = document.getElementById('toolbar-collection-select');
      if (tbCol) tbCol.value = state.activeCategory;
      const tbShade = document.getElementById('toolbar-shade-select');
      if (tbShade) tbShade.value = 'all';
      const filterShade = document.getElementById('filter-shade');
      if (filterShade) filterShade.value = 'all';
      const filterBright = document.getElementById('filter-brightness');
      if (filterBright) filterBright.value = 'all';
      const filterTone = document.getElementById('filter-tone');
      if (filterTone) filterTone.value = 'all';

      renderCategoryTabs();
      renderCollectionPills();
      selectColor(match);
      renderSwatchGrid();
      showToast(`Đã chọn màu chủ đạo "${match.code} (${match.hex.toUpperCase()})" (${title})`);
    }

    const studioEl = document.getElementById('color-studio-app');
    if (studioEl) {
      studioEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // --- 8. EVENT BINDINGS & INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Search with debounce
    const searchInput = document.getElementById('color-search-input');
    const searchClear = document.getElementById('color-search-clear');
    let searchDebounce = null;

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchDebounce);
        const val = e.target.value;
        if (searchClear) {
          if (val) searchClear.classList.remove('hidden');
          else searchClear.classList.add('hidden');
        }
        searchDebounce = setTimeout(() => {
          state.searchQuery = val;
          state.desktopDisplayLimit = state.desktopPageSize;
          state.mobilePage = 1;
          renderSwatchGrid();
        }, 180);
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          searchInput.focus();
        }
        searchClear.classList.add('hidden');
        state.searchQuery = '';
        state.desktopDisplayLimit = state.desktopPageSize;
        state.mobilePage = 1;
        renderSwatchGrid();
      });
    }

    // 2. Toolbar Collection Select (Mobile Dropdown Sync)
    const tbCol = document.getElementById('toolbar-collection-select');
    if (tbCol) {
      tbCol.addEventListener('change', (e) => {
        setActiveCategory(e.target.value);
      });
    }

    // 3. Toolbar & Sidebar Shade Filter
    const tbShade = document.getElementById('toolbar-shade-select');
    const filterShade = document.getElementById('filter-shade');
    function syncShade(val) {
      state.activeShade = val;
      state.desktopDisplayLimit = state.desktopPageSize;
      state.mobilePage = 1;
      if (tbShade) tbShade.value = val;
      if (filterShade) filterShade.value = val;
      renderSwatchGrid();
    }
    if (tbShade) tbShade.addEventListener('change', (e) => syncShade(e.target.value));
    if (filterShade) filterShade.addEventListener('change', (e) => syncShade(e.target.value));

    // 4. Brightness & Tone Filters
    const filterBright = document.getElementById('filter-brightness');
    if (filterBright) {
      filterBright.addEventListener('change', (e) => {
        state.activeBrightness = e.target.value;
        state.desktopDisplayLimit = state.desktopPageSize;
        state.mobilePage = 1;
        renderSwatchGrid();
      });
    }

    const filterTone = document.getElementById('filter-tone');
    if (filterTone) {
      filterTone.addEventListener('change', (e) => {
        state.activeTone = e.target.value;
        state.desktopDisplayLimit = state.desktopPageSize;
        state.mobilePage = 1;
        renderSwatchGrid();
      });
    }

    // 5. Reset Filters Button
    const btnReset = document.getElementById('btn-reset-filters');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        state.activeCategory = 'all';
        state.activeShade = 'all';
        state.activeBrightness = 'all';
        state.activeTone = 'all';
        state.searchQuery = '';
        state.desktopDisplayLimit = state.desktopPageSize;
        state.mobilePage = 1;

        if (searchInput) searchInput.value = '';
        if (searchClear) searchClear.classList.add('hidden');
        if (tbCol) tbCol.value = 'all';
        if (tbShade) tbShade.value = 'all';
        if (filterShade) filterShade.value = 'all';
        if (filterBright) filterBright.value = 'all';
        if (filterTone) filterTone.value = 'all';

        const gridContainer = document.getElementById('swatch-grid-container');
        if (gridContainer) gridContainer.scrollTop = 0;

        renderCategoryTabs();
        renderCollectionPills();
        renderSwatchGrid();
        showToast('Đã xóa các bộ lọc');
      });
    }

    // 6. View Mode Toggle (Grid vs Compact)
    const btnGrid = document.getElementById('btn-view-grid');
    const btnCompact = document.getElementById('btn-view-compact');
    if (btnGrid && btnCompact) {
      btnGrid.addEventListener('click', () => {
        state.viewMode = 'grid';
        btnGrid.classList.add('active');
        btnCompact.classList.remove('active');
        renderSwatchGrid();
      });

      btnCompact.addEventListener('click', () => {
        state.viewMode = 'compact';
        btnCompact.classList.add('active');
        btnGrid.classList.remove('active');
        renderSwatchGrid();
      });
    }

    // 7. Desktop Load More Button
    const btnLoadMore = document.getElementById('btn-load-more');
    if (btnLoadMore) {
      btnLoadMore.addEventListener('click', () => {
        state.desktopDisplayLimit += state.desktopPageSize;
        renderSwatchGrid();
      });
    }

    // 8. Copy Color Code & HEX
    const btnCopy = document.getElementById('btn-copy-color');
    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        if (!state.selectedColor) return;
        const textToCopy = `${state.selectedColor.code} (${state.selectedColor.hex.toUpperCase()})`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast(`Đã sao chép: ${textToCopy}`);
          }).catch(() => {
            showToast(`Mã màu: ${textToCopy}`);
          });
        } else {
          showToast(`Mã màu: ${textToCopy}`);
        }
      });
    }

    // 9. Favorite Toggle
    const btnFav = document.getElementById('btn-fav-color');
    if (btnFav) {
      btnFav.addEventListener('click', () => {
        if (!state.selectedColor) return;
        const code = state.selectedColor.code;
        if (state.favorites.has(code)) {
          state.favorites.delete(code);
          showToast(`Đã xóa ${code} khỏi mục yêu thích`);
        } else {
          state.favorites.add(code);
          showToast(`Đã lưu ${code} vào mục yêu thích`);
        }
        saveFavorites();
        updateActiveBanner();
      });
    }

    // 10. Window Resize Handling (Switch between Desktop Independent Scroll and Mobile Pagination)
    let resizeTimer = null;
    let lastWasDesktop = isDesktopView();
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const nowDesktop = isDesktopView();
        if (nowDesktop !== lastWasDesktop) {
          lastWasDesktop = nowDesktop;
          renderSwatchGrid();
        }
      }, 150);
    });

    // --- INITIAL RENDER & SCROLL SETUP ---
    renderCategoryTabs();
    renderCollectionPills();
    renderSwatchGrid();
    updateActiveBanner();
    initDesktopScrollCoordinator();
  });

})();
