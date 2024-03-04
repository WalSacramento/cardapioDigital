import S from './styles.module.scss'
import { Link } from 'react-router-dom'
import { FiList } from 'react-icons/fi'

import logo from '../../assets/img/logo.png'
import { motion } from 'react-magic-motion'

export default function Header() {
  return (
    <div className={S.header}>
      <Link to={'/'}>
        <motion.img
          className={S.logo}
          src={logo}
          alt="logo"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </Link>

      <div className={S.navbar}>
        <div className={S.navbarItem}>
          <Link to={'/category/Sandubas'}>
            <span>sandubas</span>
          </Link>
        </div>
        <div className={S.navbarItem}>
          <Link to={'/category/Passaports'}>
            <span>passaports</span>
          </Link>
        </div>
        <div className={S.navbarItem}>
          <Link to={'/category/Bebidas'}>
            <span>bebidas</span>
          </Link>
        </div>
        <div className={S.navbarItem}>
          <Link to={'/category/Porcoes'}>
            <span>porções</span>
          </Link>
        </div>
        <div className={S.navbarItem}>
          <Link to={'/category/Adicionais'}>
            <span>adicionais</span>
          </Link>
        </div>
        <div className={S.navbarItem}>
          <Link to={'/category/Combos'}>
            <span>combos</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
