import React from 'react'
import { Link } from 'react-router-dom'
import { MagicMotion, motion } from 'react-magic-motion'

import S from './styles.module.scss'

import logo from '../../assets/img/logo.png'

export default function HomeScreen() {
  return (
    <div className={S.container}>
      <motion.div
        initial={{ opacity: 0, scale: 3 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { scale: { type: 'spring' } }
        }}
        className={S.container}
      >
        <img className={S.logo} src={logo} alt="logo" />

        <div className={S.menu}>
          <div className={S.menuItem}>
            <Link to={'/category/Sandubas'}>
              <button>Sandubas</button>
            </Link>
          </div>
          <div className={S.menuItem}>
            <Link to={'/category/Passaports'}>
              <button>Passaports</button>
            </Link>
          </div>
          <div className={S.menuItem}>
            <Link to={'/category/Bebidas'}>
              <button>Bebidas</button>
            </Link>
          </div>
          <div className={S.menuItem}>
            <Link to={'/category/Porcoes'}>
              <button>Porções</button>
            </Link>
          </div>
          <div className={S.menuItem}>
            <Link to={'/category/Adicionais'}>
              <button>Adicionais</button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
