import styled from "styled-components";

export const Container = styled.div``;

export const Icon = styled.a`
  cursor: pointer;
  z-index: 999;
  .pin {
    width: 30px;
    height: 30px;
    border-radius: 50% 50% 50% 0;
    background: #89849b;
    position: absolute;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    left: 50%;
    top: 50%;
    margin: -20px 0 0 -20px;
    -webkit-animation-name: bounce;
    -moz-animation-name: bounce;
    -o-animation-name: bounce;
    -ms-animation-name: bounce;
    animation-name: bounce;
    -webkit-animation-fill-mode: both;
    -moz-animation-fill-mode: both;
    -o-animation-fill-mode: both;
    -ms-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-duration: 1s;
    -moz-animation-duration: 1s;
    -o-animation-duration: 1s;
    -ms-animation-duration: 1s;
    animation-duration: 1s;
  }
  .pin:after {
    content: "";
    width: 14px;
    height: 14px;
    margin: 8px 0 0 8px;
    background: #2f2f2f;
    position: absolute;
    border-radius: 50%;
  }
  .pulse {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    height: 14px;
    width: 14px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: 11px 0px 0px -12px;
    -webkit-transform: rotateX(55deg);
    -moz-transform: rotateX(55deg);
    -o-transform: rotateX(55deg);
    -ms-transform: rotateX(55deg);
    transform: rotateX(55deg);
    z-index: -2;
  }
  .pulse:after {
    content: "";
    border-radius: 50%;
    height: 40px;
    width: 40px;
    position: absolute;
    margin: -13px 0 0 -13px;
    -webkit-animation: pulsate 1s ease-out;
    -moz-animation: pulsate 1s ease-out;
    -o-animation: pulsate 1s ease-out;
    -ms-animation: pulsate 1s ease-out;
    animation: pulsate 1s ease-out;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    -o-animation-iteration-count: infinite;
    -ms-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    opacity: 0;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
    filter: alpha(opacity=0);
    -webkit-box-shadow: 0 0 1px 2px #89849b;
    box-shadow: 0 0 1px 2px #89849b;
    -webkit-animation-delay: 1.1s;
    -moz-animation-delay: 1.1s;
    -o-animation-delay: 1.1s;
    -ms-animation-delay: 1.1s;
    animation-delay: 1.1s;
  }
  @-moz-keyframes pulsate {
    0% {
      -webkit-transform: scale(0.1, 0.1);
      -moz-transform: scale(0.1, 0.1);
      -o-transform: scale(0.1, 0.1);
      -ms-transform: scale(0.1, 0.1);
      transform: scale(0.1, 0.1);
      opacity: 0;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);
    }
    50% {
      opacity: 1;
      -ms-filter: none;
      filter: none;
    }
    100% {
      -webkit-transform: scale(1.2, 1.2);
      -moz-transform: scale(1.2, 1.2);
      -o-transform: scale(1.2, 1.2);
      -ms-transform: scale(1.2, 1.2);
      transform: scale(1.2, 1.2);
      opacity: 0;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);
    }
  }
  @-webkit-keyframes pulsate {
    0% {
      -webkit-transform: scale(0.1, 0.1);
      -moz-transform: scale(0.1, 0.1);
      -o-transform: scale(0.1, 0.1);
      -ms-transform: scale(0.1, 0.1);
      transform: scale(0.1, 0.1);
      opacity: 0;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);
    }
    50% {
      opacity: 1;
      -ms-filter: none;
      filter: none;
    }
    100% {
      -webkit-transform: scale(1.2, 1.2);
      -moz-transform: scale(1.2, 1.2);
      -o-transform: scale(1.2, 1.2);
      -ms-transform: scale(1.2, 1.2);
      transform: scale(1.2, 1.2);
      opacity: 0;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);
    }
  }
  @-o-keyframes pulsate {
    0% {
      -webkit-transform: scale(0.1, 0.1);
      -moz-transform: scale(0.1, 0.1);
      -o-transform: scale(0.1, 0.1);
      -ms-transform: scale(0.1, 0.1);
      transform: scale(0.1, 0.1);
      opacity: 0;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);
    }
    50% {
      opacity: 1;
      -ms-filter: none;
      filter: none;
    }
    100% {
      -webkit-transform: scale(1.2, 1.2);
      -moz-transform: scale(1.2, 1.2);
      -o-transform: scale(1.2, 1.2);
      -ms-transform: scale(1.2, 1.2);
      transform: scale(1.2, 1.2);
      opacity: 0;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);
    }
  }
  @keyframes pulsate {
    0% {
      -webkit-transform: scale(0.1, 0.1);
      -moz-transform: scale(0.1, 0.1);
      -o-transform: scale(0.1, 0.1);
      -ms-transform: scale(0.1, 0.1);
      transform: scale(0.1, 0.1);
      opacity: 0;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);
    }
    50% {
      opacity: 1;
      -ms-filter: none;
      filter: none;
    }
    100% {
      -webkit-transform: scale(1.2, 1.2);
      -moz-transform: scale(1.2, 1.2);
      -o-transform: scale(1.2, 1.2);
      -ms-transform: scale(1.2, 1.2);
      transform: scale(1.2, 1.2);
      opacity: 0;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);
    }
  }
  /* @-moz-keyframes bounce {
    0% {
      opacity: 0;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);
      -webkit-transform: translateY(-2000px) rotate(-45deg);
      -moz-transform: translateY(-2000px) rotate(-45deg);
      -o-transform: translateY(-2000px) rotate(-45deg);
      -ms-transform: translateY(-2000px) rotate(-45deg);
      transform: translateY(-2000px) rotate(-45deg);
    }
    60% {
      opacity: 1;
      -ms-filter: none;
      filter: none;
      -webkit-transform: translateY(30px) rotate(-45deg);
      -moz-transform: translateY(30px) rotate(-45deg);
      -o-transform: translateY(30px) rotate(-45deg);
      -ms-transform: translateY(30px) rotate(-45deg);
      transform: translateY(30px) rotate(-45deg);
    }
    80% {
      -webkit-transform: translateY(-10px) rotate(-45deg);
      -moz-transform: translateY(-10px) rotate(-45deg);
      -o-transform: translateY(-10px) rotate(-45deg);
      -ms-transform: translateY(-10px) rotate(-45deg);
      transform: translateY(-10px) rotate(-45deg);
    }
    100% {
      -webkit-transform: translateY(0) rotate(-45deg);
      -moz-transform: translateY(0) rotate(-45deg);
      -o-transform: translateY(0) rotate(-45deg);
      -ms-transform: translateY(0) rotate(-45deg);
      transform: translateY(0) rotate(-45deg);
    }
  }
  @-webkit-keyframes bounce {
    0% {
      opacity: 0;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);
      -webkit-transform: translateY(-2000px) rotate(-45deg);
      -moz-transform: translateY(-2000px) rotate(-45deg);
      -o-transform: translateY(-2000px) rotate(-45deg);
      -ms-transform: translateY(-2000px) rotate(-45deg);
      transform: translateY(-2000px) rotate(-45deg);
    }
    60% {
      opacity: 1;
      -ms-filter: none;
      filter: none;
      -webkit-transform: translateY(30px) rotate(-45deg);
      -moz-transform: translateY(30px) rotate(-45deg);
      -o-transform: translateY(30px) rotate(-45deg);
      -ms-transform: translateY(30px) rotate(-45deg);
      transform: translateY(30px) rotate(-45deg);
    }
    80% {
      -webkit-transform: translateY(-10px) rotate(-45deg);
      -moz-transform: translateY(-10px) rotate(-45deg);
      -o-transform: translateY(-10px) rotate(-45deg);
      -ms-transform: translateY(-10px) rotate(-45deg);
      transform: translateY(-10px) rotate(-45deg);
    }
    100% {
      -webkit-transform: translateY(0) rotate(-45deg);
      -moz-transform: translateY(0) rotate(-45deg);
      -o-transform: translateY(0) rotate(-45deg);
      -ms-transform: translateY(0) rotate(-45deg);
      transform: translateY(0) rotate(-45deg);
    }
  }
  @-o-keyframes bounce {
    0% {
      opacity: 0;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);
      -webkit-transform: translateY(-2000px) rotate(-45deg);
      -moz-transform: translateY(-2000px) rotate(-45deg);
      -o-transform: translateY(-2000px) rotate(-45deg);
      -ms-transform: translateY(-2000px) rotate(-45deg);
      transform: translateY(-2000px) rotate(-45deg);
    }
    60% {
      opacity: 1;
      -ms-filter: none;
      filter: none;
      -webkit-transform: translateY(30px) rotate(-45deg);
      -moz-transform: translateY(30px) rotate(-45deg);
      -o-transform: translateY(30px) rotate(-45deg);
      -ms-transform: translateY(30px) rotate(-45deg);
      transform: translateY(30px) rotate(-45deg);
    }
    80% {
      -webkit-transform: translateY(-10px) rotate(-45deg);
      -moz-transform: translateY(-10px) rotate(-45deg);
      -o-transform: translateY(-10px) rotate(-45deg);
      -ms-transform: translateY(-10px) rotate(-45deg);
      transform: translateY(-10px) rotate(-45deg);
    }
    100% {
      -webkit-transform: translateY(0) rotate(-45deg);
      -moz-transform: translateY(0) rotate(-45deg);
      -o-transform: translateY(0) rotate(-45deg);
      -ms-transform: translateY(0) rotate(-45deg);
      transform: translateY(0) rotate(-45deg);
    }
  }
  @keyframes bounce {
    0% {
      opacity: 0;
      -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
      filter: alpha(opacity=0);
      -webkit-transform: translateY(-2000px) rotate(-45deg);
      -moz-transform: translateY(-2000px) rotate(-45deg);
      -o-transform: translateY(-2000px) rotate(-45deg);
      -ms-transform: translateY(-2000px) rotate(-45deg);
      transform: translateY(-2000px) rotate(-45deg);
    }
    60% {
      opacity: 1;
      -ms-filter: none;
      filter: none;
      -webkit-transform: translateY(30px) rotate(-45deg);
      -moz-transform: translateY(30px) rotate(-45deg);
      -o-transform: translateY(30px) rotate(-45deg);
      -ms-transform: translateY(30px) rotate(-45deg);
      transform: translateY(30px) rotate(-45deg);
    }
    80% {
      -webkit-transform: translateY(-10px) rotate(-45deg);
      -moz-transform: translateY(-10px) rotate(-45deg);
      -o-transform: translateY(-10px) rotate(-45deg);
      -ms-transform: translateY(-10px) rotate(-45deg);
      transform: translateY(-10px) rotate(-45deg);
    }
    100% {
      -webkit-transform: translateY(0) rotate(-45deg);
      -moz-transform: translateY(0) rotate(-45deg);
      -o-transform: translateY(0) rotate(-45deg);
      -ms-transform: translateY(0) rotate(-45deg);
      transform: translateY(0) rotate(-45deg);
    }
  } */
`;
