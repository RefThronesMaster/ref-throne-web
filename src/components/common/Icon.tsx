type IconProps = {
  className?: string;
  onClick?: () => void;
};

type ColorIconProps = IconProps & {
  color?: string;
  bgColor?: string;
};

export const DiscordIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      id="discord_icon"
      viewBox="0 0 640 512"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={className}
    >
      <path d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z" />
    </svg>
  );
};

export const TwitterIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      enableBackground="new 0 0 56.693 56.693"
      height="56.693px"
      id="twitter_icon"
      version="1.1"
      viewBox="0 0 56.693 56.693"
      width="56.693px"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
      className={className}
    >
      <path d="M52.837,15.065c-1.811,0.805-3.76,1.348-5.805,1.591c2.088-1.25,3.689-3.23,4.444-5.592c-1.953,1.159-4.115,2-6.418,2.454  c-1.843-1.964-4.47-3.192-7.377-3.192c-5.581,0-10.106,4.525-10.106,10.107c0,0.791,0.089,1.562,0.262,2.303  c-8.4-0.422-15.848-4.445-20.833-10.56c-0.87,1.492-1.368,3.228-1.368,5.082c0,3.506,1.784,6.6,4.496,8.412  c-1.656-0.053-3.215-0.508-4.578-1.265c-0.001,0.042-0.001,0.085-0.001,0.128c0,4.896,3.484,8.98,8.108,9.91  c-0.848,0.23-1.741,0.354-2.663,0.354c-0.652,0-1.285-0.063-1.902-0.182c1.287,4.015,5.019,6.938,9.441,7.019  c-3.459,2.711-7.816,4.327-12.552,4.327c-0.815,0-1.62-0.048-2.411-0.142c4.474,2.869,9.786,4.541,15.493,4.541  c18.591,0,28.756-15.4,28.756-28.756c0-0.438-0.009-0.875-0.028-1.309C49.769,18.873,51.483,17.092,52.837,15.065z" />
    </svg>
  );
};

export const GithubIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      enableBackground="new -1163 1657.697 56.693 56.693"
      height="56.693px"
      id="github_icon"
      version="1.1"
      viewBox="-1163 1657.697 56.693 56.693"
      width="56.693px"
      xmlSpace="preserve"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
      className={className}
    >
      <g>
        <path
          clipRule="evenodd"
          d="M-1134.6598,1662.9163c-13.601,0-24.63,11.0267-24.63,24.6299   c0,10.8821,7.0573,20.1144,16.8435,23.3713c1.2308,0.2279,1.6829-0.5345,1.6829-1.1849c0-0.587-0.0227-2.5276-0.0334-4.5857   c-6.8521,1.4901-8.2979-2.906-8.2979-2.906c-1.1205-2.8467-2.7347-3.6039-2.7347-3.6039   c-2.2349-1.5287,0.1685-1.4972,0.1685-1.4972c2.473,0.1737,3.7755,2.5385,3.7755,2.5385c2.1967,3.7651,5.7618,2.6765,7.1675,2.0472   c0.2211-1.5917,0.8591-2.6786,1.5637-3.2936c-5.4707-0.6226-11.2218-2.7347-11.2218-12.1722c0-2.6888,0.9623-4.8861,2.538-6.611   c-0.2557-0.6206-1.0989-3.1255,0.2386-6.5183c0,0,2.0684-0.6616,6.7747,2.525c1.9648-0.5458,4.0719-0.8195,6.165-0.829   c2.093,0.0095,4.2017,0.2832,6.17,0.829c4.7012-3.1866,6.7665-2.525,6.7665-2.525c1.3406,3.3928,0.4974,5.8977,0.2417,6.5183   c1.5793,1.7249,2.5348,3.9221,2.5348,6.611c0,9.4602-5.7618,11.5428-11.2465,12.1527c0.8834,0.7644,1.6704,2.2632,1.6704,4.561   c0,3.2955-0.0282,5.9479-0.0282,6.7592c0,0.6556,0.4432,1.4236,1.6915,1.1818c9.7812-3.2605,16.8296-12.4896,16.8296-23.3682   C-1110.0299,1673.943-1121.0574,1662.9163-1134.6598,1662.9163z"
          fillRule="evenodd"
        />
        <path d="M-1149.9611,1698.2793c-0.0542,0.1227-0.2469,0.1593-0.4222,0.0753c-0.1788-0.0804-0.2788-0.2473-0.2211-0.37   c0.053-0.126,0.2457-0.161,0.4242-0.0769C-1150.0013,1697.9882-1149.8993,1698.1566-1149.9611,1698.2793L-1149.9611,1698.2793z    M-1150.2642,1698.0547" />
        <path d="M-1148.9634,1699.3922c-0.1174,0.1086-0.3473,0.0581-0.5031-0.1139c-0.1613-0.1718-0.1912-0.4016-0.072-0.5118   c0.1211-0.1088,0.3438-0.0579,0.505,0.1139C-1148.8721,1699.0541-1148.8407,1699.2819-1148.9634,1699.3922L-1148.9634,1699.3922z    M-1149.1984,1699.14" />
        <path d="M-1147.9922,1700.8105c-0.151,0.1051-0.3979,0.0067-0.5505-0.2123c-0.151-0.2191-0.151-0.4819,0.0035-0.5872   c0.1526-0.1051,0.396-0.0104,0.5505,0.2068C-1147.8381,1700.4406-1147.8381,1700.7034-1147.9922,1700.8105L-1147.9922,1700.8105z    M-1147.9922,1700.8105" />
        <path d="M-1146.6619,1702.1812c-0.1351,0.1489-0.4227,0.1086-0.6329-0.0945c-0.2155-0.1984-0.2753-0.4803-0.1403-0.6293   c0.1371-0.149,0.4263-0.1072,0.6381,0.0944C-1146.5831,1701.7501-1146.5182,1702.0337-1146.6619,1702.1812L-1146.6619,1702.1812z    M-1146.6619,1702.1812" />
        <path d="M-1144.8265,1702.9769c-0.0597,0.1927-0.3365,0.2804-0.6154,0.1984c-0.2788-0.0845-0.4608-0.3103-0.4047-0.5051   c0.0577-0.1943,0.3361-0.2855,0.6169-0.1979C-1144.9512,1702.5563-1144.7688,1702.7805-1144.8265,1702.9769L-1144.8265,1702.9769z    M-1144.8265,1702.9769" />
        <path d="M-1142.8107,1703.1243c0.0067,0.2031-0.2299,0.3716-0.5226,0.3752c-0.2944,0.0067-0.533-0.1577-0.5361-0.3577   c0-0.2052,0.2313-0.3717,0.5258-0.3768C-1143.0509,1702.7594-1142.8107,1702.9227-1142.8107,1703.1243L-1142.8107,1703.1243z    M-1142.8107,1703.1243" />
        <path d="M-1140.9351,1702.8052c0.035,0.198-0.1686,0.4015-0.4594,0.4557c-0.2859,0.0526-0.5504-0.0701-0.587-0.2665   c-0.0354-0.2031,0.1716-0.4066,0.4573-0.4592C-1141.233,1702.4846-1140.9722,1702.6036-1140.9351,1702.8052L-1140.9351,1702.8052z    M-1140.9351,1702.8052" />
      </g>
    </svg>
  );
};

export const SearchIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 64 64"
      {...props}
      className={className}
    >
      <path d="M 27 9 C 17.075 9 9 17.075 9 27 C 9 36.925 17.075 45 27 45 C 31.129213 45 34.9263 43.587367 37.966797 41.240234 L 51.048828 54.322266 C 51.952828 55.226266 53.418266 55.226266 54.322266 54.322266 C 55.226266 53.418266 55.226266 51.952828 54.322266 51.048828 L 41.240234 37.966797 C 43.587367 34.9263 45 31.129213 45 27 C 45 17.075 36.925 9 27 9 z M 27 13 C 34.719 13 41 19.281 41 27 C 41 34.719 34.719 41 27 41 C 19.281 41 13 34.719 13 27 C 13 19.281 19.281 13 27 13 z"></path>
    </svg>
  );
};

export const ProgressCircleIcon = ({
  className,
  color,
  bgColor,
  ...props
}: ColorIconProps) => {
  const dasharray = 500;
  return (
    <svg
      width="28px"
      height="28px"
      viewBox="0 0 290 290"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={className}
    >
      <circle
        cx="145"
        cy="145"
        r="120"
        stroke="currentColor"
        strokeWidth="30"
        fill="transparent"
        className={bgColor ?? "text-gray-700"}
      />

      <circle
        cx="145"
        cy="145"
        r="120"
        stroke="currentColor"
        strokeWidth="30"
        fill="transparent"
        // strokeDasharray="circumference"
        strokeDasharray={dasharray}
        // strokeDasharray="20"
        // strokeDashoffset="circumference - currentSkill.percent / 100 * circumference"
        // strokeDashoffset="100"
        strokeDashoffset={0.6 * dasharray}
        className={color ?? "text-blue-500"}
      />
    </svg>
  );
};

type SortIconProps = IconProps & { order?: "ASC" | "DESC" | undefined };

export const SortIcon = ({ className, order, ...props }: SortIconProps) => {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={className}
    >
      <path
        opacity={order == "ASC" ? 1 : 0.5}
        d="M20 10.875C20.3013 10.875 20.5733 10.6948 20.6907 10.4173C20.8081 10.1399 20.7482 9.81916 20.5384 9.60289L16.5384 5.47789C16.3972 5.33222 16.2029 5.25 16 5.25C15.7971 5.25 15.6029 5.33222 15.4616 5.47789L11.4616 9.60289C11.2519 9.81916 11.1919 10.1399 11.3093 10.4173C11.4268 10.6948 11.6988 10.875 12 10.875H15.25V18C15.25 18.4142 15.5858 18.75 16 18.75C16.4142 18.75 16.75 18.4142 16.75 18L16.75 10.875H20Z"
      />
      <path
        opacity={order == "DESC" ? 1 : 0.5}
        d="M12 13.125C12.3013 13.125 12.5733 13.3052 12.6907 13.5827C12.8081 13.8601 12.7482 14.1808 12.5384 14.3971L8.53844 18.5221C8.39719 18.6678 8.20293 18.75 8.00002 18.75C7.79711 18.75 7.60285 18.6678 7.46159 18.5221L3.46159 14.3971C3.25188 14.1808 3.19192 13.8601 3.30934 13.5827C3.42676 13.3052 3.69877 13.125 4.00002 13.125H7.25002L7.25002 6C7.25002 5.58579 7.5858 5.25 8.00002 5.25C8.41423 5.25 8.75002 5.58579 8.75002 6L8.75002 13.125L12 13.125Z"
      />
    </svg>
  );
};

export const SwordIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={className}
    >
      <g>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          fillRule="nonzero"
          d="M7.05 13.406l3.534 3.536-1.413 1.414 1.415 1.415-1.414 1.414-2.475-2.475-2.829 2.829-1.414-1.414 2.829-2.83-2.475-2.474 1.414-1.414 1.414 1.413 1.413-1.414zM3 3l3.546.003 11.817 11.818 1.415-1.414 1.414 1.414-2.474 2.475 2.828 2.829-1.414 1.414-2.829-2.829-2.475 2.475-1.414-1.414 1.414-1.415L3.003 6.531 3 3zm14.457 0L21 3.003l.002 3.523-4.053 4.052-3.536-3.535L17.457 3z"
        />
      </g>
    </svg>
  );
};

export const AttendIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 51 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={className}
    >
      <path d="M5.1 45C3.6975 45 2.4973 44.5108 1.4994 43.5325C0.5015 42.5542 0.0017 41.3767 0 40V5C0 3.625 0.4998 2.44833 1.4994 1.47C2.499 0.491667 3.6992 0.00166667 5.1 0H45.9C47.3025 0 48.5035 0.49 49.5031 1.47C50.5027 2.45 51.0017 3.62667 51 5V40C51 41.375 50.501 42.5525 49.5031 43.5325C48.5052 44.5125 47.3042 45.0017 45.9 45H5.1ZM5.1 40H45.9V5H5.1V40ZM7.65 35H20.4V30H7.65V35ZM32.0025 30L44.625 17.625L40.9912 14.0625L32.0025 22.9375L28.3687 19.375L24.7987 22.9375L32.0025 30ZM7.65 25H20.4V20H7.65V25ZM7.65 15H20.4V10H7.65V15Z" />
    </svg>
  );
};
export const OwnedIcon = ({ className, ...props }: IconProps) => {
  return (
    <svg
      width="38"
      height="26"
      viewBox="0 0 38 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={className}
    >
      <path
        d="M8.63306 23.5397L8.63293 23.5397L8.62877 23.5508C8.51133 23.8669 8.31827 24.0755 8.03908 24.207C7.78007 24.329 7.56408 24.318 7.33453 24.1856L7.32467 24.1799L7.31456 24.1747C5.30149 23.1328 3.66219 21.63 2.39297 19.6569C1.13301 17.6982 0.5 15.484 0.5 13C0.5 10.5422 1.11422 8.34686 2.33634 6.40023C3.56601 4.44159 5.17122 2.94637 7.15599 1.90528L7.16485 1.90064L7.17351 1.89564C7.40718 1.76089 7.63844 1.74377 7.91788 1.86152C8.20931 1.98432 8.41926 2.19136 8.55761 2.51312L8.56293 2.52551L8.56892 2.5376C8.6916 2.78521 8.70315 3.03004 8.59238 3.30952C8.47358 3.60927 8.28275 3.8314 8.00925 3.99097C6.40035 4.84746 5.11565 6.08288 4.15949 7.687C3.19935 9.29779 2.72034 11.0724 2.72034 13C2.72034 14.9286 3.19932 16.7038 4.15949 18.3146C5.11566 19.9188 6.4004 21.1537 8.00939 22.0091C8.28612 22.1705 8.48678 22.3972 8.61892 22.704C8.74204 22.9899 8.74533 23.2583 8.63306 23.5397ZM10.161 13.0001V13C10.161 9.52822 11.3649 6.58769 13.7808 4.14955C16.1965 1.71159 19.1074 0.498958 22.5422 0.500001H22.5424C23.9901 0.500001 25.3543 0.73461 26.6386 1.2012C27.9313 1.67087 29.1054 2.32219 30.1631 3.15529L30.1658 3.15746C30.3955 3.33571 30.4958 3.54332 30.4958 3.81875C30.4958 4.11232 30.3925 4.36716 30.1575 4.60432C29.9542 4.8095 29.703 4.92461 29.3744 4.94468C29.0523 4.96436 28.7574 4.87942 28.473 4.67441C27.6253 4.04746 26.6989 3.5699 25.6956 3.24265C24.6903 2.91477 23.6386 2.75114 22.5429 2.75H22.5424C19.7262 2.75 17.317 3.75064 15.344 5.74182C13.3711 7.73283 12.3814 10.162 12.3814 13C12.3814 15.838 13.3711 18.2672 15.344 20.2582C17.317 22.2494 19.7262 23.25 22.5424 23.25C23.6395 23.25 24.6921 23.0863 25.6977 22.7572C26.7006 22.4289 27.6262 21.9515 28.4727 21.3258C28.7584 21.1205 29.054 21.0356 29.376 21.0553C29.7046 21.0754 29.9549 21.1904 30.1569 21.395L30.1575 21.3957C30.3925 21.6328 30.4958 21.8877 30.4958 22.1812C30.4958 22.4567 30.3955 22.6643 30.1658 22.8425L30.1631 22.8447C29.1054 23.6778 27.9313 24.3291 26.6386 24.7988C25.3543 25.2654 23.9901 25.5 22.5424 25.5C19.1063 25.5 16.1948 24.2873 13.7791 21.8504C11.3633 19.4134 10.16 16.473 10.161 13.0001ZM32.8806 14.9769L33.7248 14.125H32.5254H22.5424C22.2138 14.125 21.9617 14.0183 21.7517 13.8057C21.5407 13.592 21.4331 13.3344 21.4322 12.9996C21.4323 12.6641 21.5396 12.4076 21.7505 12.1955C21.9621 11.9827 22.2153 11.8759 22.5432 11.875C22.5433 11.875 22.5434 11.875 22.5436 11.875L32.5254 11.875H33.7248L32.8806 11.0231L31.4314 9.56057C31.2385 9.36588 31.1335 9.11775 31.1335 8.775C31.1335 8.43225 31.2385 8.18412 31.4314 7.98943L31.0763 7.6375L31.4314 7.98943C31.624 7.79508 31.8676 7.69063 32.2034 7.69063C32.5391 7.69063 32.7828 7.79508 32.9753 7.98943L37.1618 12.2144L37.5169 11.8625L37.1618 12.2144C37.3968 12.4516 37.5 12.7064 37.5 13C37.5 13.2936 37.3968 13.5484 37.1618 13.7856L37.5169 14.1375L37.1618 13.7856L32.9753 18.0106C32.7828 18.2049 32.5391 18.3094 32.2034 18.3094C31.8676 18.3094 31.624 18.2049 31.4314 18.0106C31.2385 17.8159 31.1335 17.5678 31.1335 17.225C31.1335 16.8822 31.2385 16.6341 31.4314 16.4394L32.8806 14.9769Z"
        
      />
    </svg>
  );
};
