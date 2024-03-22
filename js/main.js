
function adjustTextLength() {
    // 뷰포트 너비에 따라 최대 글자 수 결정
    const big_tablet_maxWidth = 768; // 예를 들어, 태블릿 뷰포트 너비 기준
    const small_tablet_maxWidth = 600; // 예를 들어, 태블릿 뷰포트 너비 기준
    const maxChars = window.innerWidth > big_tablet_maxWidth ? 200 : window.innerWidth > small_tablet_maxWidth ? 100 : 50;

    // .article-description 클래스를 가진 모든 p 태그를 선택
    const paragraphs = document.querySelectorAll('.article-description');

    paragraphs.forEach(p => {
      // 원본 텍스트 저장 또는 원본 텍스트 사용
      const originalText = p.getAttribute('data-original-text') || p.textContent;
      p.setAttribute('data-original-text', originalText);

      // 글자 수 조정
      if (originalText.length > maxChars) {
        p.textContent = originalText.substr(0, maxChars) + '...';
      } else {
        p.textContent = originalText;
      }
    });
  }

  // 페이지 로드 시 텍스트 조정
  document.addEventListener('DOMContentLoaded', adjustTextLength);

  // 윈도우 크기 조절 시 텍스트 조정
  window.addEventListener('resize', adjustTextLength);