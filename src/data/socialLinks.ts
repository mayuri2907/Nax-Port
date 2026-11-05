export interface SocialLink {
  id: string;
  name: string;
  handle: string;
  url: string;
  icon: string;
  color: string;
  ariaLabel: string;
}

export const SOCIAL_LINKS = {
  whatsapp: {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: '+91 8155952384',
    url: 'https://wa.me/918155952384',
    icon: 'MessageCircle',
    color: '#25D366',
    ariaLabel: 'Message Navin Chaudhary on WhatsApp'
  },
  github: {
    id: 'github',
    name: 'GitHub',
    handle: '@Nax46',
    url: 'https://github.com/Nax46',
    icon: 'Github',
    color: '#171717',
    ariaLabel: 'Visit Navin Chaudhary GitHub profile'
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    handle: '@astralxxixnax',
    url: 'https://www.instagram.com/astralxxixnax?vrfl=cXplb2RjcXN3NGVr',
    icon: 'Instagram',
    color: '#E4405F',
    ariaLabel: 'Visit Navin Chaudhary Instagram profile'
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Navin Chaudhary',
    url: 'https://linkedin.com/in/navin-chaudhary',
    icon: 'Linkedin',
    color: '#0A66C2',
    ariaLabel: 'Connect with Navin Chaudhary on LinkedIn'
  },
  email: {
    id: 'email',
    name: 'Email',
    handle: 'navinchaudhary.dev@gmail.com',
    url: 'mailto:navinchaudhary.dev@gmail.com',
    icon: 'Mail',
    color: '#F47B35',
    ariaLabel: 'Send an email to Navin Chaudhary'
  }
};

