import React from "react";
import MenuGender from "../components/MainMenuComponents/Gender";
import MenuAge from "../components/MainMenuComponents/Age";
import MenuSamplesType from "../components/MainMenuComponents/SamplesType";
import MenuStatus from "../components/MainMenuComponents/WomanStatus";

export default [
  {
    id: "samples",
    label: "Amostras",
    options: [
      {
        id: "registered",
        label: "Amostras Registadas",
        menu: (key) => <MenuSamplesType key={key} />,
      },
      {
        id: "tested",
        label: "Amostras Testadas",
        menu: (key) => <MenuSamplesType key={key} />,
      },
      {
        id: "rejected",
        label: "Amostras Rejeitadas",
        menu: (key) => <MenuSamplesType key={key} />,
      },
      {
        id: "non_validated",
        label: "Amostras não validadas",
        menu: (key) => <MenuSamplesType key={key} />,
      },
    ],
  },
  {
    id: "tat",
    label: "Tempo de Resposta",
    options: [
      {
        id: "tat",
        label: "Tempo de Resposta",
        menu: (key) => <MenuSamplesType key={key} />,
      },
    ],
  },
  {
    id: "viral-suppression",
    label: "Supressão Viral",
    options: [
      {
        id: "suppression-gender",
        label: "Supressão viral por gênero",
        menu: (key) => <MenuGender key={key} />,
      },
      {
        id: "suppression-age",
        label: "Supressão viral por idade",
        menu: (key) => <MenuAge key={key} />,
      },
      {
        id: "suppression-status",
        label: "Supressão viral por status",
        menu: (key) => <MenuStatus key={key} />,
      },
    ],
  },
];
