'use client';

import { MailOutlined, EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons"
import styles from "./ContactSection.module.scss"

export default function ContactSection() {
  const contacts = [
    {
      icon: <MailOutlined />,
      title: "Email",
      text: "Our friendly team is here to help.",
      link: "mailto:hello@goodrequest.com",
      label: "hello@goodrequest.com",
    },
    {
      icon: <EnvironmentOutlined />,
      title: "Office",
      text: "Come say hello at our office HQ.",
      link: "https://maps.google.com/?q=Obchodná 3D, Žilina",
      label: "Obchodná 3D, 010 08 Žilina, Slovakia",
    },
    {
      icon: <PhoneOutlined />,
      title: "Phone",
      text: "Mon–Fri from 8am to 5pm.",
      link: "tel:+421911750750",
      label: "+421 911 750 750",
    },
  ]

  return (
    <section className={styles.section}>
      {contacts.map((item) => (
        <div key={item.title} className={styles.card}>
          <div className={styles.icon}>{item.icon}</div>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <a href={item.link}>{item.label}</a>
        </div>
      ))}
    </section>
  )
}
