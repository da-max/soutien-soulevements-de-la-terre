import { A } from '@solidjs/router'

export interface FooterProps {
    class?: string
}

export const Footer = (props: FooterProps) => {
    return (
        <footer
            flex
            flex-justify-around
            flex-align-center
            class={props.class}
            bg-white
            p-8
            shadow-lg
        >
            <p>
                Pour soutenir les soulèvements de la terre :{' '}
                <a
                    href="https://lessoulevementsdelaterre.org/soutenir"
                    link
                    target="_blank"
                >
                    https://lessoulevementsdelaterre.org/soutenir
                </a>
            </p>
            <p>
                <A href={'/about'}>À propos</A>
            </p>
        </footer>
    )
}
