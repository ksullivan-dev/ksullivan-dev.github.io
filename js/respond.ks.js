var bkgClass = $( 'body' ).attr( 'class' );

$( function() {
    $( document ).on( 'click', function( event ) {
        if( $( '.menu-container' ).offset().left === 0 && ! $( event.target ).closest( '.menu-container' ).length ) {
            $( 'input#menu-toggle' ).attr( 'checked', false );
        }
    });

	$( '.main-menu a' ).bind( 'click', function( event ){
  		event.preventDefault();
        var link = $( event.currentTarget )[0].hash;
        var linkOffset = $( link ).offset().top - 130;
        $( 'html, body' ).animate({ scrollTop: linkOffset }, 1000 );
  		$( 'input#menu-toggle' ).attr( 'checked', false );
  	});
});

$( window ).on( 'DOMContentLoaded load resize orientationchange scroll', function(){
    elementInViewportAction();
    lastChildHeight();
    majorBreakpoint();
});

function elementInViewportSetup( el ) {
    var rect = el.getBoundingClientRect();
    return (
        ( window.innerHeight || document.documentElement.clientHeight ) / 2 <= rect.bottom &&
        rect.top <= ( window.innerHeight || document.documentElement.clientHeight ) &&
        rect.bottom >= 180
    );
}

function elementInViewportAction() {
    $( '.main-section' ).each( function(){
        if( elementInViewportSetup( this ) ){
            $( '.main-menu a' ).removeClass( 'active' );
            $( '.main-menu a[href=#' + this.id + ']' ).addClass( 'active' );
            return false;
        }
    });
}

function lastChildHeight() {
    $( '.main-section:last-child' ).css({ 'min-height' : ( window.innerHeight - 130) });
}

function majorBreakpoint() {
	if ( $( '#desktop' ).is( ':visible' ) ) {
		$( 'body' ).addClass( 'desktop' ).removeClass( 'tablet mobile' );
	}
	if ( $( '#tablet' ).is( ':visible' ) ) {
		$( 'body' ).addClass( 'tablet' ).removeClass( 'desktop mobile' );
	}
	if ($( '#mobile' ).is( ':visible' ) ) {
		$( 'body' ).addClass( 'mobile' ).removeClass( 'desktop tablet' );
        $( '.main-menu' ).find( 'a' ).removeClass( 'active' );
        $( '.menu-container' ).hide();
        setTimeout( function(){
            $( '.menu-container' ).show();
        }, 500 );
	}
	var newBkgClass = $( 'body' ).attr( 'class' );
	if ( bkgClass != newBkgClass ) {
		$( 'input#menu-toggle' )[0].checked = false;
	}
	bkgClass = newBkgClass;
}
