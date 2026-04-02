// Icon components for Pixel WebPages
import React from 'react';

interface IconProps {
    size?: number;
    className?: string;
    strokeWidth?: number;
    fill?: string;
}

const IconBase: React.FC<IconProps & { children: React.ReactNode }> = ({
    size = 24,
    className = '',
    strokeWidth = 2,
    fill = 'none',
    children
}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fill}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {children}
    </svg>
);

export const ArrowRight: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </IconBase>
);

export const ArrowLeft: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
    </IconBase>
);

export const Menu: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
    </IconBase>
);

export const X: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </IconBase>
);

export const Zap: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </IconBase>
);

export const MousePointer: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        <path d="m13 13 6 6" />
    </IconBase>
);

export const Database: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </IconBase>
);

export const ExternalLink: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" x2="21" y1="14" y2="3" />
    </IconBase>
);

export const Star: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </IconBase>
);

export const CheckCircle: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </IconBase>
);

export const Mail: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </IconBase>
);

export const Phone: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </IconBase>
);

export const Instagram: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </IconBase>
);

export const Facebook: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </IconBase>
);

export const Linkedin: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </IconBase>
);

export const Send: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <line x1="22" x2="11" y1="2" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </IconBase>
);

export const Box: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" x2="12" y1="22.08" y2="12" />
    </IconBase>
);

export const Users: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </IconBase>
);

export const HomeIcon: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </IconBase>
);

export const Info: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="16" y2="12" />
        <line x1="12" x2="12.01" y1="8" y2="8" />
    </IconBase>
);

export const PenTool: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="m12 19 7-7 3 3-7 7-3-3z" />
        <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="m2 2 7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
    </IconBase>
);

export const Calendar: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
    </IconBase>
);

export const Activity: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </IconBase>
);

export const LogOut: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
    </IconBase>
);

export const Edit2: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </IconBase>
);

export const Trash2: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <line x1="10" x2="10" y1="11" y2="17" />
        <line x1="14" x2="14" y1="11" y2="17" />
    </IconBase>
);

export const Plus: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <line x1="12" x2="12" y1="5" y2="19" />
        <line x1="5" x2="19" y1="12" y2="12" />
    </IconBase>
);

export const SettingsIcon: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </IconBase>
);

export const ChevronRight: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <polyline points="9 18 15 12 9 6" />
    </IconBase>
);

export const ChevronDown: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <polyline points="6 9 12 15 18 9" />
    </IconBase>
);

export const Code: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
    </IconBase>
);

export const Globe: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" x2="22" y1="12" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </IconBase>
);

export const TrendingUp: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </IconBase>
);

export const Clock: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </IconBase>
);

export const Terminal: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" x2="20" y1="19" y2="19" />
    </IconBase>
);

export const ShoppingCart: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </IconBase>
);

export const DollarSign: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </IconBase>
);

export const Shield: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </IconBase>
);

export const Scale: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="M7 21h10" />
        <path d="M12 3v18" />
        <path d="M3 7h18" />
    </IconBase>
);

export const Brain: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.97-3.06 2.5 2.5 0 0 1-2.51-4.58 2.5 2.5 0 1 1 2.61-4.22A2.5 2.5 0 0 1 9.5 2Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.97-3.06 2.5 2.5 0 0 0 2.51-4.58 2.5 2.5 0 1 0-2.61-4.22A2.5 2.5 0 0 0 14.5 2Z" />
    </IconBase>
);

export const Smartphone: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
    </IconBase>
);

export const Cloud: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M17.5 19a5.5 5.5 0 0 0 0-11h-1.07a8.5 8.5 0 1 0-12.87 8.33" />
    </IconBase>
);

export const Rocket: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.5-1 1-4c2 0 3 .5 3 .5" />
        <path d="M12 15v5s1-.5 4-1c0-2-.5-3-.5-3" />
    </IconBase>
);

export const Palette: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
        <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
        <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
        <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10c.84 0 1.5-.66 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8z" />
    </IconBase>
);

export const Video: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="m22 8-6 4 6 4V8Z" />
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </IconBase>
);

export const Music: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
    </IconBase>
);

export const Monitor: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
    </IconBase>
);

export const FileText: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" x2="8" y1="13" y2="13" />
        <line x1="16" x2="8" y1="17" y2="17" />
        <line x1="10" x2="8" y1="9" y2="9" />
    </IconBase>
);

export const Coffee: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
        <line x1="6" x2="6" y1="2" y2="4" />
        <line x1="10" x2="10" y1="2" y2="4" />
        <line x1="14" x2="14" y1="2" y2="4" />
    </IconBase>
);

export const Heart: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </IconBase>
);

export const Truck: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <rect width="16" height="13" x="1" y="3" rx="2" />
        <polyline points="16 8 20 8 23 11 23 16 16 16" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
    </IconBase>
);

export const Check: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <polyline points="20 6 9 17 4 12" />
    </IconBase>
);
export const Eye: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
        <circle cx="12" cy="12" r="3" />
    </IconBase>
);
export const Search: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
    </IconBase>
);

export const Bell: React.FC<IconProps> = (props) => (
    <IconBase {...props}>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </IconBase>
);
