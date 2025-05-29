document.addEventListener('DOMContentLoaded', function () {
    const banner = document.getElementById('ccc-cookie-banner');
    if (!banner) return;

    // Sprawdź, czy użytkownik już wyraził zgodę
    if (document.cookie.includes('ccc_consent=accepted') || document.cookie.includes('ccc_consent=custom') || document.cookie.includes('ccc_consent=rejected')) {
        banner.style.display = 'none';
        return;
    }

    fetch(cccFront.resturl, {
        headers: {
            'X-WP-Nonce': cccFront.nonce
        }
    })
        .then(response => response.json())
        .then(settings => {
            const bannerType = settings.banner_type || 'box';
            const bannerPosition = settings.banner_position || 'bottom-right';
            const bannerTitle = settings.banner_title || 'Używamy ciasteczek';
            const bannerMessage = settings.banner_message || 'Nasza strona używa ciasteczek, aby poprawić Twoje doświadczenie. Możesz zaakceptować wszystkie, odrzucić lub dostosować ustawienia.';
            const customizeButtonText = settings.customize_button_text || 'Dostosuj';
            const rejectButtonText = settings.reject_button_text || 'Odrzuć';
            const acceptButtonText = settings.accept_button_text || 'Akceptuję Wszystkie';

            // Podziel bannerMessage na akapity
            const bannerMessageParagraphs = bannerMessage.split('\n').filter(line => line.trim() !== '').map(line => `<p class="ccc-message">${line.trim()}</p>`).join('');

            // Styl banera
            banner.className = 'ccc-banner';
            banner.classList.add(`ccc-type-${bannerType}`);
            if (bannerType === 'box') {
                banner.classList.add(`ccc-position-${bannerPosition}`);
            } else if (bannerType === 'banner') {
                banner.classList.add(`ccc-position-${bannerPosition}`);
            } else if (bannerType === 'popup') {
                banner.classList.add('ccc-position-center');
            }

            // Struktura banera z dynamicznymi stylami
            banner.innerHTML = `
                <div class="ccc-inner" style="background-color: ${settings.banner_background_color || '#ffffff'}; color: ${settings.banner_text_color || '#000000'}">
                    <h2 class="ccc-title">${bannerTitle}</h2>
                    <div class="ccc-content">
                        <div class="ccc-message-container">${bannerMessageParagraphs}</div>
                        <div class="ccc-buttons">
                            <button id="ccc-customize" class="ccc-button ccc-button-customize" style="background-color: ${settings.customize_button_color || '#0073aa'}">${customizeButtonText}</button>
                            <button id="ccc-reject" class="ccc-button ccc-button-reject" style="background-color: ${settings.reject_button_color || '#dc3545'}">${rejectButtonText}</button>
                            <button id="ccc-accept" class="ccc-button ccc-button-accept" style="background-color: ${settings.accept_button_color || '#28a745'}">${acceptButtonText}</button>
                        </div>
                    </div>
                </div>
            `;

            // Obsługa przycisków
            document.getElementById('ccc-accept').addEventListener('click', () => {
                document.cookie = 'ccc_consent=accepted; path=/; max-age=31536000'; // Zgoda ważna przez rok
                document.cookie = 'ccc_analytics=accepted; path=/; max-age=31536000';
                document.cookie = 'ccc_functional=accepted; path=/; max-age=31536000';
                document.cookie = 'ccc_performance=accepted; path=/; max-age=31536000';
                document.cookie = 'ccc_advertising=accepted; path=/; max-age=31536000';
                banner.style.display = 'none';
            });

            document.getElementById('ccc-reject').addEventListener('click', () => {
                document.cookie = 'ccc_consent=rejected; path=/; max-age=31536000';
                document.cookie = 'ccc_analytics=rejected; path=/; max-age=31536000';
                document.cookie = 'ccc_functional=rejected; path=/; max-age=31536000';
                document.cookie = 'ccc_performance=rejected; path=/; max-age=31536000';
                document.cookie = 'ccc_advertising=rejected; path=/; max-age=31536000';
                banner.style.display = 'none';
            });

            document.getElementById('ccc-customize').addEventListener('click', () => {
                // Ukryj banner podczas wyświetlania modala
                banner.style.display = 'none';

                // Podziel customizeMessage na akapity
                const customizeMessage = settings.customize_message || 'Wybierz, które ciasteczka chcesz zaakceptować.';
                const customizeMessageParagraphs = customizeMessage.split('\n').filter(line => line.trim() !== '').map(line => `<p class="ccc-modal-message">${line.trim()}</p>`).join('');

                // Tworzenie modala
                const modal = document.createElement('div');
                modal.className = 'ccc-modal';
                modal.innerHTML = `
                    <div class="ccc-modal-content">
                        <span class="ccc-modal-close">×</span>
                        <h2 class="ccc-modal-title">${settings.customize_title || 'Dostosuj ustawienia ciasteczek'}</h2>
                        <div class="ccc-modal-body">
                            <div class="ccc-modal-message-container">${customizeMessageParagraphs}</div>
                            <div class="ccc-modal-categories">
                                <div class="ccc-category">
                                    <div class="ccc-category-header">
                                        <span class="ccc-category-title">Niezbędne (zawsze włączone)</span>
                                        <label class="ccc-toggle disabled">
                                            <input type="checkbox" checked disabled>
                                            <span class="ccc-toggle-slider"></span>
                                        </label>
                                    </div>
                                    <p class="ccc-category-description">Niezbędne pliki cookie pomagają w korzystaniu z witryny, umożliwiając podstawowe funkcje, takie jak nawigacja po stronie i dostęp do bezpiecznych obszarów witryny. Witryna nie może działać poprawnie bez tych plików cookie.</p>
                                </div>
                                <div class="ccc-category">
                                    <div class="ccc-category-header">
                                        <span class="ccc-category-title">Funkcjonalne</span>
                                        <label class="ccc-toggle">
                                            <input type="checkbox" id="ccc-functional">
                                            <span class="ccc-toggle-slider"></span>
                                        </label>
                                    </div>
                                    <p class="ccc-category-description">Funkcjonalne pliki cookie umożliwiają witrynie zapewnienie większej funkcjonalności i personalizacji. Mogą być ustawiane przez nas lub przez dostawców zewnętrznych, których usługi dodaliśmy do naszych stron.</p>
                                </div>
                                <div class="ccc-category">
                                    <div class="ccc-category-header">
                                        <span class="ccc-category-title">Analityczne</span>
                                        <label class="ccc-toggle">
                                            <input type="checkbox" id="ccc-analytics">
                                            <span class="ccc-toggle-slider"></span>
                                        </label>
                                    </div>
                                    <p class="ccc-category-description">Analityczne pliki cookie pomagają nam zrozumieć, jak użytkownicy wchodzą w interakcje z witryną, zbierając i raportując informacje anonimowo.</p>
                                </div>
                                <div class="ccc-category">
                                    <div class="ccc-category-header">
                                        <span class="ccc-category-title">Wydajnościowe</span>
                                        <label class="ccc-toggle">
                                            <input type="checkbox" id="ccc-performance">
                                            <span class="ccc-toggle-slider"></span>
                                        </label>
                                    </div>
                                    <p class="ccc-category-description">Wydajnościowe pliki cookie służą do zrozumienia i analizy kluczowych wskaźników wydajności witryny, co pomaga dostarczać lepsze doświadczenie użytkownika.</p>
                                </div>
                                <div class="ccc-category">
                                    <div class="ccc-category-header">
                                        <span class="ccc-category-title">Reklama</span>
                                        <label class="ccc-toggle">
                                            <input type="checkbox" id="ccc-advertising">
                                            <span class="ccc-toggle-slider"></span>
                                        </label>
                                    </div>
                                    <p class="ccc-category-description">Reklamowe pliki cookie są używane do dostarczania użytkownikom odpowiednich reklam i kampanii marketingowych. Śledzą one użytkowników na różnych stronach i zbierają informacje w celu dostarczenia spersonalizowanych reklam.</p>
                                </div>
                            </div>
                        </div>
                        <div class="ccc-modal-buttons">
                            <button id="ccc-modal-reject" class="ccc-button ccc-button-reject" style="background-color: ${settings.reject_button_color || '#dc3545'}">${rejectButtonText}</button>
                            <button id="ccc-save-preferences" class="ccc-button ccc-button-save" style="background-color: ${settings.save_preferences_color || '#0073aa'}">${settings.save_preferences_text || 'Zapisz moje preferencje'}</button>
                            <button id="ccc-modal-accept" class="ccc-button ccc-button-accept" style="background-color: ${settings.accept_button_color || '#28a745'}">${acceptButtonText}</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);

                // Obsługa zamknięcia modala
                modal.querySelector('.ccc-modal-close').addEventListener('click', () => {
                    modal.remove();
                    // Pokaż banner z powrotem, jeśli użytkownik nie wyraził zgody
                    if (!document.cookie.includes('ccc_consent')) {
                        banner.style.display = 'block';
                    }
                });

                // Obsługa zapisu preferencji
                modal.querySelector('#ccc-save-preferences').addEventListener('click', () => {
                    const functional = modal.querySelector('#ccc-functional').checked;
                    const analytics = modal.querySelector('#ccc-analytics').checked;
                    const performance = modal.querySelector('#ccc-performance').checked;
                    const advertising = modal.querySelector('#ccc-advertising').checked;
                    document.cookie = `ccc_consent=custom; path=/; max-age=31536000`;
                    document.cookie = `ccc_functional=${functional ? 'accepted' : 'rejected'}; path=/; max-age=31536000`;
                    document.cookie = `ccc_analytics=${analytics ? 'accepted' : 'rejected'}; path=/; max-age=31536000`;
                    document.cookie = `ccc_performance=${performance ? 'accepted' : 'rejected'}; path=/; max-age=31536000`;
                    document.cookie = `ccc_advertising=${advertising ? 'accepted' : 'rejected'}; path=/; max-age=31536000`;
                    modal.remove();
                });

                // Obsługa przycisku "Odrzuć" w modalu
                modal.querySelector('#ccc-modal-reject').addEventListener('click', () => {
                    document.cookie = 'ccc_consent=rejected; path=/; max-age=31536000';
                    document.cookie = 'ccc_analytics=rejected; path=/; max-age=31536000';
                    document.cookie = 'ccc_functional=rejected; path=/; max-age=31536000';
                    document.cookie = 'ccc_performance=rejected; path=/; max-age=31536000';
                    document.cookie = 'ccc_advertising=rejected; path=/; max-age=31536000';
                    modal.remove();
                });

                // Obsługa przycisku "Akceptuj wszystkie" w modalu
                modal.querySelector('#ccc-modal-accept').addEventListener('click', () => {
                    document.cookie = 'ccc_consent=accepted; path=/; max-age=31536000';
                    document.cookie = 'ccc_analytics=accepted; path=/; max-age=31536000';
                    document.cookie = 'ccc_functional=accepted; path=/; max-age=31536000';
                    document.cookie = 'ccc_performance=accepted; path=/; max-age=31536000';
                    document.cookie = 'ccc_advertising=accepted; path=/; max-age=31536000';
                    modal.remove();
                });
            });
        })
        .catch(error => {
            console.error('Błąd pobierania ustawień:', error);
        });
});